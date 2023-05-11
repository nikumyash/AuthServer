const router = require('express').Router();
const auth = require('../auth/auth');


router.get('/secret',auth,(req,res)=>{
    res.send("This is a secret message");
})

router.get('/public',(req,res)=>{
    res.send("This is a public message");
})

module.exports = router;