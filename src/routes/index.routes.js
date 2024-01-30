import express from 'express';
import adminRoutes from "./admin.routes.js"
import studentRoutes from "./student.routes.js"
import authMiddleware from '../middleware/atuh.middleware.js';
const Router = express.Router()

// use a auth middleware to access

Router.use("/admin", adminRoutes)
Router.use("/student", studentRoutes)



export { Router }