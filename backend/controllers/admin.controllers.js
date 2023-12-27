import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/adminSchema.js";
import User from "../models/userSchema.js";
import dotenv from "dotenv";
dotenv.config();
const { SECRET } = process.env;

// ###################### adminRegister ######################### //
export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the admin with the given email already exists
    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        status: "Admin Already Exists",
        message: "Admin with this email already exists.",
      });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });
    // Save the new admin to the database
    await newAdmin.save();

    return res.status(201).json({
      status: "Admin Registered Successfully",
      message: {
        newAdmin,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during registration",
      message: err.message,
    });
  }
};

//######################## login admin ###########################//

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    try {
      const exists = await Admin.findOne({ email });
      if (!exists) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Password check
      const isValidPassword = await bcrypt.compare(password, exists.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: exists._id }, SECRET); // Replace 'your-secret-key' with your actual secret key
      res.json({
        Admin: exists,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//########################## secured session #################################//
export const securedHomepage = (req, res) => {
  res.json({ message: `Welcome to the secured homepage, ${req.user.userId}!` });
};


// ########################## view user lists ###############################//
export const viewUser= async (req, res) => {
    const UserList = await User.find({});
    if (!UserList) {
     return res.status(400).json({
       status: "Error during user lists Update",
       message: "Invalid user selected!",
     });
   }else{
     return res.status(200).json(UserList);
   }
  }



  //  delete employee controller
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};