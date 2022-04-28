const jwt = require("jsonwebtoken");
const user = require("../model/UserModel.js");

const authorizedUser = async (req, res, next) => {
  let token = req.headers.token;
  if (!token) {
    res.status(401).send({ msg: "user is not authorized" });
  }
  try {
    let decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decode);

    req.user = await user.findOne({ email: decode.email }).select("-password");

    next();
  } catch (e) {
    res.send(e);
  }
};

module.exports = { authorizedUser };
