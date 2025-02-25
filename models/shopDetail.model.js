const mongoose = require('mongoose')

const shopDetailSchema = mongoose.Schema({
  shopName: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  scopes: {
    type: String,
    required: true
  }
}, { timestamps: true })

const shopDetailModel = mongoose.model('shopDetail', shopDetailSchema)

module.exports = shopDetailModel