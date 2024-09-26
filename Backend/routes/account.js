const express = require("express");
const { Account } = require("../models/db");
const router = express.Router();

router.get("/balance", async(req,res)=>{
    const account  =await Account.findOne({
        userID: req.userID
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer" , async(req,res) => {
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