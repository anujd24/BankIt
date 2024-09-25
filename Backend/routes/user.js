const express = require("express");
const zod = require("zod");
const { User } = require("../models/db.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/config.js");
const router = express.Router();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstname: zod.string(),
    secondname: zod.string()
});

router.post("/signup", async(req,res)=> {
    const body = req.body;
    const {success} = signupSchema.safeParse(body);

    if(!success){
        return res.json({
            message : "Email already taken/ Incorrect inputs"
        })
    }

    const user = User.findOne({
        username: body.username
    })

    if(user._id){
        return res.json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const dbUser = await User.create(body);
    const token = jwt.sign({userID: dbUser._id}, JWT_SECRET)
    res.json({
        message: "User Created Successfully",
        token: token
    })
});

router.post("/signup", async(req,res)=> {
    
});
module.exports = router;