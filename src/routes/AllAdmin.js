import express from "express";
import Admin from "../models/AdminS.js";
const AllAdmin = express.Router()
AllAdmin.get("/all-admin", async (req, res) => {
    try {
      const Admins = await Admin.find();
      res.json({
        data: Admins,
      });
    } catch (error) {
      console.error("Error fetching admins:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching admins",
        error: error.message,
      });
    }
  });
  export default AllAdmin;