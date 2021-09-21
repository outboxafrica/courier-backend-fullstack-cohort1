const jwt = require('jsonwebtoken');

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
        console.log(decodedToken.id);
        req.userID = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(404).json({error: "Authorization Token missing. Please Login.."});
  }
};


module.exports = { requireAuth };