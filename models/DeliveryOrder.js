const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliveryOrderSchema = new Schema({
    userID:{
        type:String,
        required:true
    },
    itemname:{
        type:String,
        required:true
    },
    sendersname:{
        type:String,
        required:true
    },
     senderscontact:{
        type:Number,
        required:true
    },
     senderslocation:{
        type:String,
        required:true
    },
    receiversname:{
        type:String,
        required:true
    },
    receiverscontact:{
        type:Number,
        required:true
    },
    receiverslocation:{
        type:String,
        required:true
    },
})

const DeliveryOrder = mongoose.model('DeliveryOrder', DeliveryOrderSchema);

module.exports = DeliveryOrder