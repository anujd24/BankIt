import express from "express";
import zod from "zod";
import mongoose from "mongoose";
import { User, Account } from "../models/db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import { authMiddleware } from "../Middleware/middleware.js";
import bcrypt from "bcrypt";

const router = express.Router();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
});

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);

    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({ username: body.username });
    if (existingUser) {
        return res.status(400).json({
            message: "Email already taken"
        });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10); // Hash password
    const dbUser = await User.create({
        username: body.username,
        password: hashedPassword, // Store hashed password
        firstname: body.firstname,
        lastname: body.lastname,
    });

    const userId = dbUser._id;
    await Account.create({
        userId,
        balance: Math.floor(Math.random() * 10000 + 1),
    });

    const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);
    res.json({
        message: "User Created Successfully",
        token: token
    });
});

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Incorrect inputs" });
    }

    const user = await User.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.json({ token });
    }

    res.status(401).json({ message: "Invalid username or password" });
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Error while updating information"
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated Successfully"
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: { "$regex": filter, "$options": "i" }
        }, {
            lastname: { "$regex": filter, "$options": "i" }
        }]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id,
        }))
    });
});

export { router };
