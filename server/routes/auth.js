import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import User from "../models/User";
const saltRounds = 10;
const router = express.Router();

function validateUser(user) {
  const schema = {
    firstName: Joi.string()
      .alphanum()
      .min(1)
      .max(30)
      .required(),
    lastName: Joi.string()
      .alphanum()
      .min(1)
      .max(30)
      .required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/)
  };
  return Joi.validate(user, schema);
}

function validateLogin(user) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/)
  };
  return Joi.validate(user, schema);
}

router.post("/users", (req, res) => {
  const { credentials } = req.body;
  const { email, password } = credentials;
  const { error } = validateUser(credentials);
  if (error) return res.status(400).send(error.details[0].message);

  // if no errors, check hash pw and check db whether email exists
  bcrypt.hash(password, saltRounds).then(hashedPassword => {
    let userObj = Object.assign({}, credentials);
    userObj.passwordHash = hashedPassword;

    const user = new User(userObj);
    User.findOne({ email: user.email }).then(foundUser => {
      if (foundUser) {
        res.status(400).json({ errors: "Email already exists" });
      } else {
        user.save().then(user => {
          console.log(user.toAuthJSON());
          res.json({ user: user.toAuthJSON() });
        });
      }
    });
  });
});

router.post("/auth", (req, res) => {
  const {
    credentials,
    credentials: { email, password }
  } = req.body;

  // check credentials formatting
  const { error } = validateLogin(credentials);
  if (error) return res.status(400).send(error.details[0].message);

  // check whether email exists in db
  User.findOne({ email: email }).then(foundUser => {
    if (foundUser) {
      // if user is found, check hashed password
      bcrypt.compare(password, foundUser.passwordHash).then(match => {
        // if pw match, return user json
        if (match) return res.json({ user: foundUser.toAuthJSON() });
        // else return error to client
        else return res.status(400).json({ errors: "Incorrect password" });
      });
    } else {
      // else email was not found, return error to client
      res.status(400).json({ errors: "Email has not been registered" });
    }
  });
});

export default router;
