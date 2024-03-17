import mongoose from "mongoose";
import validator from "validator";


const sendOtp = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address',
          }
        },
    otp:{type:String,
    required:true}

})

export const userOtp = mongoose.model("userotp",sendOtp)