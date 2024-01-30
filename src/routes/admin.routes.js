import express from "express"
import { login, register, authRefreshToken, getAllStudents, getOneStudent } from "../controller/admin.controller.js";
import authMiddleware from "../middleware/atuh.middleware.js";

const router = express.Router()
router.post("/register", register)
router.get("/login", login)
router.get("/auth/check-refresh-token/:token", authRefreshToken)
router.get("/auth/get-students", authMiddleware, getAllStudents)
router.get("/auth/get-student/:email", authMiddleware, getOneStudent)
router.get("/auth/secret", authMiddleware, (req, res) => {
    const secret = process.env.JWT_SECRET
    res.send({
        secret: secret
    })
})
export default router
