let jwt = require("jsonwebtoken");
let User = require("../Models/userModel");

let protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      let decoded = jwt.verify(token, process.env.JWT_TOKEN);

      req.user = await User.findById(decoded.id).select("-password");
      req.token = token;
      const tokenExpirationDate = new Date(decoded.exp * 1000);
      // Store the token expiration date in the request object
      req.tokenExpirationDate = tokenExpirationDate;
      next();
    } catch (err) {
      console.log(err);
      res
        .status(401)
        .json({ error: "No authorithy for this access", errors: err });
    }
  } else {
    res.status(401).json({ error: "No authorithy for this access" });
  }
};

module.exports = { protect };
