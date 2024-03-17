import express from "express";
import { login, signup } from "../controllers/auth.js";
import { getAllUsers, updateUsers } from "../controllers/users.js";
import auth from "../middleware/auth.js";
import { signUpUser, otpLogin } from "../controllers/auth.js";
import { sendUserOtp } from "../controllers/auth.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateUsers);
router.post("/register", signUpUser);
router.post("/sendotp", sendUserOtp);

router.post("/sendUserOtp", otpLogin);
export default router;
