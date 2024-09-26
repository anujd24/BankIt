const { JWT_SECRET} = require("../config/config.js");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(403).json({});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded token:", decoded);
        
        if(decoded.userID) {
            req.userID = decoded.userID;
            next();
        }
        else{
            return res.status(403).json({
                message: "Something went wrong"
            });
        }

}

    catch(err){
        return res.status(403).json({
            message: "Error!"
        });
    }
};

module.exports = authMiddleware;