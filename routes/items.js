const express = require('express');

const itemsController = require('../controllers/items');

const router = express.Router();

router.post('/itemdetail',itemsController.getData);
router.post('/updateitemcache',itemsController.getUpdatedItemCache);

module.exports = router;