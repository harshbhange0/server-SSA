import express from "express";
import Admin from "../models/AdminS.js";
import bcrypt from "bcryptjs";

const AuthAdminS = express.Router();
const AuthAdminSLogIn = express.Router();

AuthAdminS.post("/auth", async (req, res) => {
  try {
    const User_Name = req.body.admin_user_name;
    const User_Password = req.body.admin_user_password; // Correct field name

    if (!User_Password) {
      // Check if the password is empty or undefined
      return res.json({
        success: false,
        message: "Password is required.",
      });
    }

    // You can adjust the number of rounds as needed
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(User_Password, saltRounds);

    const existingAdmin = await Admin.findOne({ admin_user_name: User_Name });
    if (existingAdmin) {
      return res.json({
        success: false,
        message: "Admin Already Exists",
      });
    } else {
      const newAdmin = new Admin({
        admin_user_name: User_Name,
        admin_user_password: hashedPassword,
      });

      const savedAdmin = await newAdmin.save();

      return res.json({
        success: true,
        message: "Admin Saved Successfully",
        data: savedAdmin,
      });
    }
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating admin",
      error: error.message,
    });
  }
});
//log in api

AuthAdminSLogIn.post("/login", async (req, res) => {
  try {
    const User_Name = req.body.admin_user_name;
    const User_Password = req.body.admin_user_password; // Correct field name

    const existingAdmin = await Admin.findOne({ admin_user_name: User_Name });

    if (!existingAdmin) {
      return res.json({
        success: false,
        message: "Admin not found",
      });
    }

    const isValidPassword = bcrypt.compareSync(
      User_Password,
      existingAdmin.admin_user_password
    );

    if (!isValidPassword) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    // Authentication successful
    return res.json({
      success: true,
      message: "Login successful",
      data: existingAdmin,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
});

export { AuthAdminS, AuthAdminSLogIn };
