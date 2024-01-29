import express from 'express';
import adminRoutes from "./admin.routes.js"
import userRoutes from "./user.routes.js"
import authMiddleware from '../middleware/atuh.middleware.js';
const Router = express.Router()

// use a auth middleware to access

Router.use("/admin", adminRoutes)
Router.use("/student", userRoutes)

Router.get("/secret", authMiddleware, (req, res) => {
    const secret = process.env.JWT_SECRET
    res.send({
        secret: secret
    })
})

export { Router }