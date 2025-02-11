const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return(req,res,next) =>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            //tokenCookieValue is null that means there is no cookie exists, so we will immediately call the next function (no need to validate cookie when there is no cookie exists lol)
           return next();
        }
        try {
            const userPayload  = validateToken(tokenCookieValue);
            req.user = userPayload; //if the token is validated it will return userpayload and we will send that user payload with the req.user with next function
        } catch (error) {
        }
        return next();
    };
}

module.exports = {
    checkForAuthenticationCookie
};