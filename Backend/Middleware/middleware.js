import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if(!authHeader || !authHeader.startsWith("Bearer")){
//         return res.status(403).json({});
//     }

//     const token = authHeader.split(" ")[1];

//     try{
//         const decoded = jwt.verify(token, JWT_SECRET);
//         console.log("Decoded token:", decoded);
        
//         if(decoded.userId) {
//             req.userId = decoded.userId;
//             next();
//         }
//         else{
//             return res.status(403).json({
//                 message: "Something went wrong"
//             });
//         }

// }

//     catch(err){
//         return res.status(403).json({
//             message: "Error!"
//         });
//     }
// };

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(403).json({
            message: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded token:", decoded);

        if (decoded.userId) {
            req.userId = decoded.userId;
            console.log("User ID set:", req.userId);
            next();  // Continue to the next middleware or route handler
        } else {
            return res.status(403).json({
                message: "Invalid token"
            });
        }
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(403).json({
            message: "Token verification failed"
        });
    }
};

