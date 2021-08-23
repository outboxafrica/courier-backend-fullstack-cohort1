const express = require('express');
const router = express.Router();
const deliveryorderController = require('../controllers/deliveryOrderController');

router.get('/', deliveryorderController.getAllDeliveryOrders);

router.get('/:id', deliveryorderController.getDeliveryOrderById);

router.post('/', deliveryorderController.createDeliveryOrder);

router.patch('/:id', deliveryorderController.updateDeliveryOrder);

router.delete('/:id', deliveryorderController.deleteDeliveryOrder);

module.exports = router;