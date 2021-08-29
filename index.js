const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// Delivery Routes
const deliveryOrderRoute = require('./routes/deliveryOrderRoute')

const app = express();

// middleware
// app.use(express.static('public'));
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
app.get(requireAuth);
app.use(authRoutes);

// Routes for API
app.use('/api/deliveryOrder', deliveryOrderRoute);  
app.use( '/api/users', authRoutes);
 



const PORT = process.env.PORT || 3000;
// Server
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT} ....`);
})