const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const authMiddleware = asyncHandler(
async (req,res,next)=>{
let token;
if(req?.headers?.authorization?.startsWith("Bearer")){
    token = req.headers.authorization.split(' ')[1];
    try {
        if(token){
            const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded?.id);
            req.user=user;
            next();
        }
    } catch (error) {
        throw new Error('Not Authorized token expired,login again')
    }
   
}else{
    throw new Error('There is no token attached to the header')
}
}
)

const isAdmin = asyncHandler(
async (req,res,next)=>{
    const {email} = req.user;
    const adminUser = await User.findOne({email});
    if(adminUser.role!=="admin"){
        throw new Error('This user in not admin')
    }else{
        next();
    }

}
)

module.exports = {authMiddleware,isAdmin}