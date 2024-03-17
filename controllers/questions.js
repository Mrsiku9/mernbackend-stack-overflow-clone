import mongoose from 'mongoose';
import Questions from '../models/question.js'
import axios from 'axios'


const API_KEY =process.env.SECRET_KEY_OPEN_AI


export const AskQuestion = async(req,res) => {
    const postQuestionData = req.body;
    const postQuestion = new Questions (postQuestionData)
    console.log(req.userId)
    try {
        await postQuestion.save();
        res.status(200).json("Posted a question successfully");
      } catch (error) {
        console.log(error);
        res.status(409).json("Couldn't post a new question");
      }
}
 export const getAllQuestions = async (req,res) => {
  try {
    const questionList = await Questions.find().sort({ askedOn: -1 });;
    
    res.status(200).json(questionList)
  } catch (error) {
    res.status(404).json({message:error.message})
    
  }
 }

 export const deleteQuestion = async (req,res) => {
  const {id:_id} = req.params
  if(!mongoose.Types.ObjectId.isValid(_id)){
    res.status(404).send("question  unavailable")
  }
  try {
   await Questions.findByIdAndDelete(_id)
   res.status(200).json({message:"successfully deleted..."})
    
  } catch (error) {
    res.status(404).json({message:error.message})
  }
 }

 
 export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value } = req.body;
  const userId = req.userId;
  console.log(_id)
  console.log(value)
  console.log(userId)

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    const question = await Questions.findById(_id);
    const upIndex = question.upVote.findIndex((id) => id === String(userId));
    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
    } else if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
          
        );
    
      }
     
    }
    await Questions.findByIdAndUpdate(_id, question);
    res.status(200).json({ message: "voted successfully..." });
  } catch (error) {
    res.status(404).json({ message: "id not found" });
  }
};


 
export const QuestionAi = async (req, res) => {
    const { question } = req.body;


    try {
       
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: question,
                max_tokens: 250,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY} `,
                },
            }
        );

        const answer = response.data.choices[0].text.trim();

        
        res.json({ answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


