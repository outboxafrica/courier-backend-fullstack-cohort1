const DeliveryOrder = require('../models/DeliveryOrder');

const getAllDeliveryOrders = (req, res)=>{
    DeliveryOrder.find()
    .then((result)=>{
        res.json(result)
    })
    .catch((error)=>{
        res.json(error.message)
    })
}

const getDeliveryOrderById = (req, res)=>{
    DeliveryOrder.findById(req.params.id)
    .then((result)=>{
        res.json(result)
    })
    .catch((error)=>{
        res.json(error.message)
    })
}

const getOrdersByUserId = (req,res)=>{
    console.log(req.params.userID);

    DeliveryOrder.find({userID:req.params.userID})
        .then((result)=>{
            res.json(result);
        })
        .catch((error)=>{
            res.json(error);
        })
}

const createDeliveryOrder = (req, res)=>{
    console.log(req);
    const deliveryOrder = new DeliveryOrder({...req.body,userID: req.userID});
    deliveryOrder.save()
    .then((result)=>{
        res.json(result)
    })
    .catch((error)=>{
        res.json(error.message)
    })
}

const updateDeliveryOrder = (req, res)=>{
    DeliveryOrder.findByIdAndUpdate(req.params.id,req.body)
    .then((result)=>{
        res.json(result)
    })
    .catch((error)=>{
        res.json(error.message)
    })
}

const deleteDeliveryOrder = (req, res)=>{
    DeliveryOrder.findByIdAndDelete(req.params.id)
    .then((result)=>{
        res.json('DeliveryOrder Successfully Cancelled')
    })
    .catch((error)=>{
        res.json(error.message)
    })
}

module.exports = {
    getAllDeliveryOrders,
    getDeliveryOrderById,
    createDeliveryOrder,
    updateDeliveryOrder,
    deleteDeliveryOrder,
    getOrdersByUserId
}