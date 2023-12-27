import express from "express";
const router = express.Router();
 import {AddUser} from "../controllers/user.controller.js"
 import { loginAdmin, securedHomepage, adminRegister, viewUser, deleteUser } from "../controllers/admin.controllers.js";
 import authenticateToken from "../auth/authorization.js";
// ..................Routes page to get or post ................//
// user routes
router.post("/adduser", AddUser);

// admin routes REGISTER
router.post("/adminregister", adminRegister);
// admin routes login
 router.post("/adminlogin", loginAdmin);

 // Secured homepage with protected form
router.get('/dashboard', authenticateToken, securedHomepage);

// List of all users
router.get('/lists', authenticateToken, viewUser);

// delete users
router.delete('/delete/:id', deleteUser)

export default router;