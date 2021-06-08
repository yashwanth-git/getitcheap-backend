const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    //Get the token
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    //Check if normal auth or google auth
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "TEST");

      req.userId = decodedData.id || undefined;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData.sub || undefined; //Sub is similar to id which google provides
    }
    next(); //If everything is fine move to next
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
