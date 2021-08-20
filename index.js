const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');


// database connection
const dbURI = 'mongodb+srv://Maratah:test1234@cluster0.q5jue.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log('Database Connection Established . . .'))
  .catch((err) => console.log('Database Connection Failed . . .'));


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);


/* === Delivery order Routes === **/

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



const PORT = process.env.PORT || 3000;
// Server
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT} ....`);
})