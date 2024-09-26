const express = require("express");
const zod = require("zod");
const mongoose = require("mongoose");
const { User, Account } = require("../models/db.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/config.js");
const  authMiddleware  = require("../Middleware/middleware.js");
const router = express.Router();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
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

    const dbUser = await User.create({
        username: body.username,
        password: body.password,
        firstname: body.firstname,
        lastname: body.lastname,
      });

      const userId = dbUser._id;

    await Account.create({
        userId,
        balance: Math.floor(Math.random() * 10000 + 1),
    })

    
    const token = jwt.sign({userId: dbUser._id}, JWT_SECRET);
    res.json({
        message: "User Created Successfully",
        token: token
    });
});

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
});

router.post("/signin", async(req,res)=> {
    const body = req.body;
    const { success } = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken/ Incorrect Inputs"
        });
    }

    const user = await User.findOne({
        username : req.body.username,
        password: req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId: user._id,
        }, JWT_SECRET);
        res.json({
            token:token
        });
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
       return res.status(411).json({
            message: "Error while updating information"
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);

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
    });
     
    res.json({
        user: users.map(user => ({
            username : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            _id: user._id,
        }))
    });
}); 


module.exports = router;