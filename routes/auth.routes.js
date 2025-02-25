const express = require('express')
const { auth, callback } = require('../controllers/auth.controller.js')

const router = express.Router()

router.get('/', auth)
router.get('/callback', callback)

module.exports = router