const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token)return res.status(401).send('Access Denied');
    try{
        const verified = jwt.verify(token,process.env.SECRET);
        req.user = verified;
    }catch(error){
        return res.status(401).send('Invalid Token');
    }
    next();
};