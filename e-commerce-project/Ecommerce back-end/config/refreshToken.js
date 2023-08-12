const jwt = require('jsonwebtoken');

const generateRereshToken = (id) => {
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{expiresIn: "3d"});
}

module.exports= {generateRereshToken};