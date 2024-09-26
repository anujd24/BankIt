const express = require("express");
const { Account } = require("../models/db");
const authMiddleware = require("../Middleware/middleware");
const mongoose = require("mongoose");
const router = express.Router();



router.get("/balance", authMiddleware,async(req,res)=>{
    console.log("User ID from middleware:", req.userID);
    const account = await Account.findOne({
        userID: req.userID
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

    const account = await Account.findOne({userID: req.userID}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userID: to }).session(session);

    if(!toAccount){
        await session.abortTransaction();   
        res.status(400).json({
            message : "Invalid Account"
        });
    }

    await Account.updateOne({ userID: req.userID }, { $inc :{ balance: -amount } }).session(session);
    await Account.updateOne({ userID: to }, { $inc: { balance: amount} }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer Successful"
    });
}); 

module.exports = router;