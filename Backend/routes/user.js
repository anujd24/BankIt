const express = require("express");
const zod = require("zod");
const mongoose = require("mongoose");
const { User } = require("../models/db.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/config.js");
const { authMiddleware } = require("../Middleware/middleware.js");
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

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
})

router.post("/signin", async(req,res)=> {
    const { success } = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken/ Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password: req.body.password
    });

    if(user){
        const token = jwt.sign({
            userID: user._id,
        }, JWT_SECRET);
        res.json({
            token:token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
    
});


const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
});

router.put("/", authMiddleware, async (req,res) =>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body,{
        id : req.userID
    })

    res.json({
        message: "Updated Successfully"
    })
})

router.get("/bulk", async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        },{
            lastname: {
                "$regex": filter
            }
        }]
    })
     
    res.json({
        user: users.map(user => ({
            username : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            
        }))
    })
}); 


module.exports = router;