const mongoose = require("mongoose");

const MONGODB_URL = "mongodb+srv://anujd24:GkTYCfHDWEwzmVIn@ad.tqrvfcl.mongodb.net/BankIt";

mongoose.connect(MONGODB_URL);

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
});

const AccountSchema = mongoose.Schema({
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model("Account", AccountSchema);
const User = mongoose.model("User", UserSchema);

module.exports = {
    User,
    Account
}
