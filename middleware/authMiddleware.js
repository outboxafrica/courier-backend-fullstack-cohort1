const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'courier-backend-fullstack-cohort1', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({
          "error": error.message
        });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(200).json({
      "result": res.body
    });
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'courier-backend-fullstack-cohort1', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };