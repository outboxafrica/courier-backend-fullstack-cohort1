const DeliveryOrder = require('../models/DeliveryOrder');

const getAllDeliveryOrders = (req, res)=>{
    DeliveryOrder.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((error)=>{
        res.send(error.message)
    })
}

const getDeliveryOrderById = (req, res)=>{
    DeliveryOrder.findById(req.params.id)
    .then((result)=>{
        res.send(result)
    })
    .catch((error)=>{
        res.send(error.message)
    })
}

const createDeliveryOrder = (req, res)=>{
    const deliveryOrder = new DeliveryOrder(req.body);
    deliveryOrder.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((error)=>{
        res.send(error.message)
    })
}

const updateDeliveryOrder = (req, res)=>{
    DeliveryOrder.findByIdAndUpdate(req.params.id,req.body)
    .then((result)=>{
        res.send(result)
    })
    .catch((error)=>{
        res.send(error.message)
    })
}

const deleteDeliveryOrder = (req, res)=>{
    DeliveryOrder.findByIdAndDelete(req.params.id)
    .then((result)=>{
        res.send('DeliveryOrder Successfully Cancelled')
    })
    .catch((error)=>{
        res.send(error.message)
    })
}

module.exports = {
    getAllDeliveryOrders,
    getDeliveryOrderById,
    createDeliveryOrder,
    updateDeliveryOrder,
    deleteDeliveryOrder
}