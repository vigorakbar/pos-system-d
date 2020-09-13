const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User, USER_USERNAME_VALIDATION, USER_PASSWORD_VALIDATION } = require("../models/user.model");
const router = express.Router();

router.post("/login", async (req, res) => {
  const userLoginValidation = Joi.object({
    username: USER_USERNAME_VALIDATION,
    password: USER_PASSWORD_VALIDATION
  })

  const { error } = userLoginValidation.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(401).send("Wrong username or password")
  const passwordValid = await bcrypt.compare(req.body.password, user.password)
  if (!passwordValid) return res.status(401).send("Wrong username or password")

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username,
    email: user.email
  });
})

module.exports = router;
