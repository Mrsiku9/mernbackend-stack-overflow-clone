import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import userQuestions from "./routes/questions.js";
import answerRoutes from "./routes/answers.js";
import questionRouter from "./routes/askquestionAi.js";
import payment from './routes/paymentR.js'
import askAi from './routes/chatbotR.js'
import weatherData from './routes/weatherData.js'

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);

app.use("/questions", userQuestions);
app.use("/answer", answerRoutes);
app.use("/aiuser", questionRouter);
app.use("/api",weatherData)
app.use("/", payment);
app.use("/",askAi)

const port = process.env.PORT || 5000;
const database_con = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@stackoverflow-clone.ttmgnp4.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(database_con)
  .then(() => console.log("Database connected successfuly"))
  .then(() =>
    app.listen(port, () => {
      console.log(`server is running on ${port} successfuly`);
    })
  )
  .catch((err) => console.log(err.message));
