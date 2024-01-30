import express from "express"
import { register, login, authRefreshToken } from "../controller/student.controller.js"
const router = express.Router()
router.post("/register", register)
router.get("/login", login)
router.get("/auth/check-refresh-token/:token", authRefreshToken)
export default router