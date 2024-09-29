import express from "express";
import { Account } from "../models/db.js";
import { authMiddleware } from "../Middleware/middleware.js";
import mongoose from "mongoose";
const router = express.Router();



router.get("/balance", authMiddleware, async(req,res)=>{
    console.log("req.userID:", req.userID);
    const account = await Account.findOne({
        userId: req.userId
    });

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        });
    }

    res.json({
        balance: account.balance
    });
});

router.post("/transfer" ,authMiddleware, async(req,res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if(!toAccount){
        await session.abortTransaction();   
        res.status(400).json({
            message : "Invalid Account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc :{ balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount} }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer Successful"
    });
}); 

export {router}