const express = require('express');
const router = express.Router();
const deliveryorderController = require('../controllers/deliveryOrderController');
const {requireAuth} = require('../middleware/authMiddleware');

router.get('/', deliveryorderController.getAllDeliveryOrders);

router.get('/:id', deliveryorderController.getDeliveryOrderById);

router.get('/user/:userID', deliveryorderController.getOrdersByUserId );

router.post('/', requireAuth,deliveryorderController.createDeliveryOrder);

router.patch('/:id', requireAuth,deliveryorderController.updateDeliveryOrder);

router.delete('/:id', deliveryorderController.deleteDeliveryOrder);

module.exports = router;