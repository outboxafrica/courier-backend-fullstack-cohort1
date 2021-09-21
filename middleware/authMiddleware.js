const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  // const token = req.cookies.jwt;
  const header = req.headers.authorization;

  if(header){
    if(header.startsWith('Bearer')){
      const token = header.split(' ')[1];
      // check json web token exists & is verified
      jwt.verify(token, 'courier-backend-fullstack-cohort1', (err, decodedToken) => {
        if (err) {
          res.status(400).json({
            error: "Token is Invalid ... "
          });
        } else {
          console.log(decodedToken.id);
          req.userID = decodedToken.id;
          next();
        }
      });
    }
  }else{
    res.json({Error: "Missing Authorisation header"})
  }
   
};


module.exports = { requireAuth };