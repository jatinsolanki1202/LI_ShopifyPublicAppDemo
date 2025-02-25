const express = require('express')
const { appUninstallController } = require('../controllers/uninstall.controller.js')

const router = express.Router()

router.post('/app-uninstalled', appUninstallController)

module.exports = router