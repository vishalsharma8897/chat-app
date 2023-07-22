const { register,login,setAvatar,getAllUsers} = require("../controllers/usersController");
const router = require('express').Router();
const { body } = require('express-validator');

router.post("/register",[
  
    // Define validation rules using express-validator's check function
    body("username").isLength({ min: 4 }).withMessage("Name must has atleast 4 characters"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8})
      .withMessage("Password must be at least 8 characters"),
  
], register);

router.post("/login",[
  
  // Define validation rules using express-validator's check function
  body("username").isLength({ min: 4 }).withMessage("Name must has atleast 4 characters"),
  body("password")
    .isLength({ min: 8})
    .withMessage("Password must be at least 8 characters"),

], login);

router.post("/setAvatar/:id",setAvatar);

router.get("/allUsers/:id",getAllUsers)

module.exports= router;