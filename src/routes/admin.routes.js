import express from "express"
import { login, register, authRefreshToken } from "../controller/admin.controller.js";
const router = express.Router()
router.post("/register", register)
router.get("/login", login)
router.get("/auth/check-refresh-token/:token", authRefreshToken)
export default router
