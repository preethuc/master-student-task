import express from "express";
import { signup, login, logout,validateRole,allUsers } from "../controller/auth-user-controller";
import { auth } from "../auth-token/token-verification";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", auth, login);
router.post("/logout", auth, logout);
router.get("/role", validateRole)
router.get('/all',allUsers)
module.exports = router;
