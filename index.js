const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();
require('dotenv').config();
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
    receiverslocation:'Adjumani',
    status: 'pending'

}]

app.get('/deliveryorder',(req,res)=>{
    res.send(deliveryorderArray)
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
app.get('/deliveryorder/:id',(req,res)=>{
    const receivedOrder=deliveryorderArray.find((receivedOrder)=>{
        return receivedOrder.id===parseInt(req.params.id);
    });
    if(!receivedOrder){
        res.send("Oops, order not found!")
    }else{
        res.send(receivedOrder);
    }
    
});

// update parcel location
app.patch('/deliveryorder/:id',(req,res)=>{
    const receivedOrder=deliveryorderArray.find((receivedOrder)=>{
        return receivedOrder.id===parseInt(req.params.id);
    });
    if(!receivedOrder){
        res.send("Oops!, Order not found");
    }else{
        receivedOrder.receiverslocation=req.body.receiverslocation;
        res.send(receivedOrder);

        const mailOptions={
            from: '"Safe Courier " <from@example.com>',
            to: "user1@example.com, user2@example.com", 
            subject: "Location changed", 
            text: `The current location of your parcel has been changed to ${receivedOrder.receiversLocation}`, 
          }
          
          const transporter= nodemailer.createTransport({
            host: process.env.MAIL_SERVICE,
            auth: {
              user:process.env.USER ,
              pass: process.env.PASS
            }
          });

           transporter.sendMail(mailOptions, (error, info)=>{
             if(error){
              console.log(error);
             }
             else{
               console.log('Email sent ' + info.response)
             }
           });
        }
});


const PORT = process.env.PORT || 3000;
// Server
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT} ....`);
})



