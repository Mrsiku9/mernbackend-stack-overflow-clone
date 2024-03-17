import mongoose from "mongoose";
import User from "../models/auth.js";

 export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    const getAllUsers = [];
    allUsers.forEach((users) => {
      getAllUsers.push({
        _id: users._id,
        name: users.name,
        about: users.about,
        tags: users.tags,
        askedOn: users.askedOn,
      });
    });
    res.status(200).json(getAllUsers);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};


 export const updateUsers = async (req,res) =>{
const {id:_id} = req.params
const {name,about,tags} = req.body
if(!mongoose.Types.ObjectId.isValid(_id)){
  res.status(404).send("update data not available")
}
try {
  const updateUsers = await User.findByIdAndUpdate(_id,{$set:{'name':name,'about':about,'tags':tags}},{new:true})
res.status(200).json(updateUsers)
  
} catch (error) {
  res.status(405).json({message:error.message})
}
 }
 
