const express = require('express');

const itemsController = require('../controllers/items');

const router = express.Router();

router.get('/', itemsController.getAllItems);

router.post('/', itemsController.postItems);

router.put('/', itemsController.putItems);

router.delete('/:id', itemsController.deleteItems);

module.exports = router;