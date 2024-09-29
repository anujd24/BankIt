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
        console.log("Decoded token:", decoded);  // Log the decoded token to check what's inside

        if (decoded.userId) {
            req.userId = decoded.userId;
            console.log("User ID set:", req.userId);  // Log the user ID being set
            next();
        } else {
            return res.status(403).json({
                message: "Invalid token"
            });
        }
    } catch (err) {
        console.error("Token verification error:", err);  // Log any errors related to token verification
        return res.status(403).json({
            message: "Token verification failed"
        });
    }
};
