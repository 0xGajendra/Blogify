require('dotenv').config();
const JWT = require('jsonwebtoken');
const secret = process.env.secret;

//function to create token for user
function createTokenForUser(user){
    //payload for jwt
    const payload = {
        _id: user._id,
        email : user.email,
        profileImage : user.profileImage,
        role: user.role,
    };
    const token = JWT.sign(payload,secret);
    return token;
}

//function to validate or check for the user token

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}