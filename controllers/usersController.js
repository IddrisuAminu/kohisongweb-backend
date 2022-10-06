const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateAddUser } = require("../validations/userValidations");
const {generateToken } = require("../utils/generateToken")

const addUser = async (req, res) => {
  //validate a user
  const { error } = validateAddUser.validate(req.body);
  if (error) return res.status(402).send(error.details[0].message);

  //complexity level and hashing using bcrypt
  const salt = await bcrypt.genSalt(9);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //find user from DB
  const emailFound = await User.findOne({ email: req.body.email });
  if (emailFound) return res.status(403).send("email already exist");

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
 

  if (newUser) {
    res.status(200).json({
      name:newUser.name,
      email:newUser.email,
      password:newUser.password,
      id: newUser._id,
      token:generateToken( newUser._id)
    })
  }
 await newUser.save();
 res.status(201).json(User);


};





//user login in 
async function userSignin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json({
          
          email: user.email,
          password: user.password,
          id: user._id,
        
        });
      } else {
        res.status(401).json({
          message: "Invalid password",
        });
      }
    } else {
      res.status(401).json({
        message: "Invalid email",
      });
    }
  } catch {
    res.status(400).json({
      message: "user not found",
    });
  }
}



   module.exports = { addUser, userSignin };
