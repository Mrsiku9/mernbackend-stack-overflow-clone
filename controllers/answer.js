import mongoose from "mongoose"
import Question from "../models/question.js"


 export const postAnswer = async (req,res) =>{
const {id:_id}=req.params
const {noOfAnswers,answerBody,userAnswered,userId} = req.body
if(!mongoose.Types.ObjectId.isValid(_id)){
    res.status(404).send('questions are unavailable')
}
noOfQuestionUpdate(_id,noOfAnswers)
try {
    const updateQuestions =  await Question.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody,userAnswered,userId}]}})
    res.status(200).json(updateQuestions) 
    } catch (error) {
        console.log(error)
     res.status(400).json(error)
    
    }   
}
export const noOfQuestionUpdate = async(_id,noOfAnswers)=> {
    try {
await Question.findByIdAndUpdate(_id,{$Set:{ 'noOfAnswers':noOfAnswers}})
        
    } catch (error) {
        console.log(error)
        
    }
}

export const deleteAnswer = async(req,res) =>{
    const {id:_id}= req.params
    const {answerId,noOfAnswers} = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).send('answers are unavailable')
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        res.status(404).send('answers are unavailable')
    }
    noOfQuestionUpdate(_id,noOfAnswers)
    try {
        await Question.updateOne({_id},{
            $pull:{'answer':{_id:answerId}}
            
        })
        res.status(200).json({message:"successfuly deleted"})
        
    } catch (error) {
        res.status(405).json(error)
    }


}
// 

// const updateQuestions = await Question.findByIdAndUpdate(
//     _id,
//     {
//       $addToSet: {
//         answer: [{ answerBody, userAnswered, userId: req.userId }],
//       },
//     },
//     { new: true } // Make sure to get the updated document
//   ).lean();

//   // Convert the plain JavaScript object to JSON and send the response
//   res.status(200).json(updateQuestions);
// } catch (error) {
//   console.log(error);
//   res.status(500).send('Internal Server Error');