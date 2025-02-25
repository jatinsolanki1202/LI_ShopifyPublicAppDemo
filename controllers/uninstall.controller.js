const { default: axios } = require("axios");
const shopDetailModel = require("../models/shopDetail.model");

const appUninstallController = async (req, res) => {
  try {
    // Clean up store data from the database
    await shopDetailModel.findOneAndDelete({ shopName: req.body.domain });

    console.log(`App uninstalled by store: ${req.body.domain}`);
    res.send(`App uninstalled`)
  } catch (error) {
    console.error('Error processing uninstall webhook:', error);
    res.status(500).send('Server error');
  }
}


module.exports = {
  appUninstallController
}