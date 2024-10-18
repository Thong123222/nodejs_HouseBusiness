const express = require('express');
const router = express.Router();
const SiteController = require('../app/controllers/SiteController');

router.get('/', SiteController.home)
router.post('/', SiteController.register)

module.exports = router;