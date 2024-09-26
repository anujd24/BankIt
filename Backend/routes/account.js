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