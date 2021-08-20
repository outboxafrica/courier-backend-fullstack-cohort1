const express = require('express');

const app = express();

app.use(express.json())

//delivery  order data
const deliveryorderArray = [{
    id:1,
    itemname:'clothes',
    sendersname:'Abubaker Yusuf',
    senderscontact:'0897464536',
    senderslocation:'Kampala',
    receiversname:'Umar Lut',
    receiverscontact:'0836654749',
    receiverslocation:'Adjumani'

}]


app.get('/deliveryorder',(req,res)=>{
    res.send(deliveryorderArray)
})


app.get('/deliveryorder/:id',(req,res)=>{
    const deliveryorder = deliveryorderArray.find((deliveryorder)=>{return deliveryorder.id === parseInt(req.params.id)})
})


app.post('/deliveryorder',(req,res)=>{
    const newdeliveryorder = req.body.newdeliveryorder;
    deliveryorderArray.push(newdeliveryorder);

    res.send('Parcel Delivery Order Successfully Created !!!!!!')
})


app.delete('/deliveryorder/:id', (req, res)=>{
    const newdeliveryorder = deliveryorderArray.find((newdeliveryorder)=>{return newdeliveryorder.id === parseInt(req.params.id)});
    if(!newdeliveryorder){
        res.send('Parcel Delivery Order not Found')
    }else{
        let index = deliveryorderArray.indexOf(newdeliveryorder);
        deliveryorderArray.splice(index,1);
        res.send('Parcel Delivery Order successfully deleted')
    }
})


app.patch('/deliveryorder/:id',(req,res)=>{
    const newdeliveryorder = deliveryorderArray.find((newdeliveryorder)=>{
        return newdeliveryorder.id===parseInt(req.params.id)
    })
    if(!newdeliveryorder){res.send(' Delivery Order Not Found !!!')}
    else{newdeliveryorder.itemname=req.body.itemname;
    res.send(newdeliveryorder)}
})


app.listen(6000,()=>{
    console.log('server is listening on port 6000 ....')
})