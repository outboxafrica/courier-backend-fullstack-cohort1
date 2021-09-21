const express = require('express');
const router = express.Router();
const deliveryorderController = require('../controllers/deliveryOrderController');
const {requireAuth} = require('../middleware/authMiddleware');

router.get('/', requireAuth,deliveryorderController.getAllDeliveryOrders);

router.get('/:id', requireAuth,deliveryorderController.getDeliveryOrderById);

router.get('/user/:userID', requireAuth,deliveryorderController.getOrdersByUserId );

router.post('/', requireAuth,deliveryorderController.createDeliveryOrder);

router.patch('/:id', requireAuth,deliveryorderController.updateDeliveryOrder);

router.delete('/:id', requireAuth,deliveryorderController.deleteDeliveryOrder);

module.exports = router;