import mongoose from "mongoose"

import dotenv from "dotenv";
 
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error(" MongoDB connection error:", err));

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
});

const AccountSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

export const Account = mongoose.model("Account", AccountSchema);
export const User = mongoose.model("User", UserSchema);

// module.exports = {
//     User,
//     Account
// }
