const querystring = require('querystring')
const crypto = require('crypto')
const { default: axios } = require('axios')
const shopDetailModel = require('../models/shopDetail.model.js')
const { registerAppUninstalledWebhook } = require('../utils/registerWebhooks.js')

const auth = (req, res) => {
  const { shop } = req.query
  if (!shop) return res.json({ message: "Shop parameter is required", status: 400 })

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=${process.env.SCOPES}&redirect_uri=${process.env.REDIRECT_URI}&state=nonce_value`

  res.redirect(authUrl)
}

const callback = async (req, res) => {
  const { shop, code, hmac } = req.query

  let map = { ...req.query }
  delete map['hmac']

  const query = querystring.stringify(map)

  let generatedHmac = crypto.createHmac("sha256", process.env.SECRET_ID)
    .update(query)
    .digest('hex')

  if (generatedHmac != hmac) return res.json({ success: false, message: "Hmac Validation error", status: 400 })

  try {
    const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.SECRET_ID,
      code
    })

    let existingShop = await shopDetailModel.findOne({
      shopName: shop
    })

    let accessToken = response.data.access_token
    if (existingShop) {
      await shopDetailModel.findOneAndUpdate({ shopName: shop }, {
        accessToken, scopes: response.data.scope
      })

    } else {
      let newShop = await shopDetailModel.create({
        shopName: shop,
        accessToken,
        scopes: response.data.scope
      })

      if (!newShop) return ({ success: false, message: "error inserting new shop", })
    }

    await registerAppUninstalledWebhook(shop, accessToken)
    return res.status(200).json({ success: true, message: "App installed successfully", status: 200 })
  } catch (error) {
    res.json({ success: false, message: error.message, status: 500 })
  }

}

module.exports = {
  auth, callback
}