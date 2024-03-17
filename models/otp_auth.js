import mongoose from "mongoose";
import jwt  from "jsonwebtoken";

import validator from 'validator';
// import bcrypt from "bcryptjs"

const SECRECT_KEY = "abcdefghijklmnop"
const userOtpSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email: {
        type: String,
        required: true,
        unique: true,
        // validate(value) {
        //     if (!Validator.isEmail(value)) {
        //         throw new Error("Not Valid Email")
        //     }
        // }
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address',
          }
        },
    
    password: {
        type: String,
        required: true,
        minlength: 6
    },
   
    tokens: [
        {
            token: {
                type: String,
                required: true,
              
                
            }
        }
    ]
});
// token generate
userOtpSchema.methods.generateAuthtoken = async function(){
    try {
        let newtoken = jwt.sign({_id:this._id},SECRECT_KEY,{
            expiresIn:"1d"
        });

        this.tokens = this.tokens.concat({token:newtoken});
        await this.save();
        return newtoken;
    } catch (error) {
        res.status(400).json(error)
    }
}
// userOtpSchema.pre("save", async function(next){
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password,12)
//     }
//     next()
// })
// userOtpSchema.pre("save", async function(next) {
//     if (this.isModified("password")) {
//       try {
//         this.password = await bcrypt.hash(this.password, 12);
//       } catch (error) {
//         return next(error);
//       }
//     }
//     next();
//   });


 export const userData = mongoose.model("userData",userOtpSchema)
