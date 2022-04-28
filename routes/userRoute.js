const express = require("express");
const user = require("../model/UserModel.js");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var { authorizedUser } = require("../middleware/Authorization.js");

// Create account for user

router.post("/register", async (req, res) => {
  const isuserExist = await user.findOne({ email: req.body.email });

  if (isuserExist) return res.status(400).json("account already exist");

  try {
    const salt = await bcrypt.genSalt(9);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const newUser = new user(req.body);
    const savedUser = await newUser.save();

    var token = await jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );

    let { password, ...others } = savedUser._doc;
    res.status(200).send({ ...others, token });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

//login user

router.post("/login", async (req, res) => {
  const isUserExist = await user.findOne({ email: req.body.email });
  if (isUserExist) {
    try {
      let user = await bcrypt.compare(req.body.password, isUserExist.password);

      if (!user) return res.status(400).send({ msg: "invalide Credential" });

      var token = await jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "3d",
        }
      );

      let { password, ...others } = isUserExist._doc;

      return res.status(200).send({ ...others, token });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  } else {
    return res.status(400).send({ msg: "invalide Credential" });
  }
});
module.exports = router;
