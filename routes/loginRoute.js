const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt')
const {registerValidation,loginValidation} = require('../validation');
const jwt = require('jsonwebtoken')

router.post('/register',async (req,res)=>{
    const {error} = registerValidation(req.body);
    if(error)return res.send(error.details[0].message);
 
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("Email already exists");
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    
    
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    })
    
    try{
        const savedUser = await user.save();
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err)
    }
})


router.post('/login',async (req,res)=>{
    const {error} = loginValidation(req.body);
    if(error)return res.send(error.details[0].message);
    
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Email is not found");
    
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send("Password is wrong");

    const token = jwt.sign({_id:user._id},process.env.SECRET);
    res.header('auth-token',token).send("There ya go");
})


module.exports = router;