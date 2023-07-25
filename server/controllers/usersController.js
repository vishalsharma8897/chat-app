const User= require("../models/UserModel")
const brcypt = require("bcrypt");
const { validationResult } = require('express-validator');

  module.exports.register= async(req,res,next)=>{
     
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false ,  errors: errors.array() });
    }
  
   try {
    const {username,email,password} = req.body;
    const usercheck = await User.findOne({username});

    if(usercheck)
    return res.json({message:"Username already exists",success:false});

    const emailcheck = await User.findOne({email});

    if(emailcheck)
    return res.json({message:"email already exists",success:false});

    const hashedPassword = await brcypt.hash(password,10);
          
    const user = new User(
        {
          username: username,
          email: email,
          password: hashedPassword,
        });

        await user.save();
       
        const userWithoutPassword = { ...user.toObject() };
        delete userWithoutPassword.password;

        // console.log(userWithoutPassword);
        return res.json({success:true,userWithoutPassword});
      

  

   } catch (error) {
      return res.json({message:error,success:false});
   } 

};

module.exports.login= async(req,res,next)=>{
  alert("login route on server"); 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ success:false ,  errors: errors.array() });
  }

 try {
  const {username,password} = req.body;
  const user = await User.findOne({username});

  if(!user)
  return res.json({message:"Please enter correct crediantials",success:false});
 
  const isPasswordValid = await brcypt.compare(password,user.password);
  if(!isPasswordValid)
  {
    return res.json({message:"Please enter correct crediantials",success:false});
  }

  const userWithoutPassword = { ...user.toObject() };
  delete userWithoutPassword.password;

  return res.json({success:true,userWithoutPassword});
    
 } catch (error) {
    return res.json({message:error,success:false});
 }

};


module.exports.setAvatar =async(req,res,next)=>{
  try {
    const userId = req.params.id;
     const avatarImage = req.body.image;
     const userData= await User.findByIdAndUpdate(userId,{
      isAvatarImageSet:true,
      avatarImage,
     })

     return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage});
  } catch (error) {
    next(error);
  }
}

module.exports.getAllUsers= async(req,res,next)=>{
  try {
    const users = await User.find({_id:{$ne:req.params.id}}).select([
      "email",
      "username",
      "avatarImage",
      "_id"
    ]);
  
    return res.json(users);
   
  } catch (error) {
    next(error);
  }
}
