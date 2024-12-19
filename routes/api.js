import express from "express";
const router = express.Router();
import * as userController from "../app/controllers/userController.js";
import * as featureController from "../app/controllers/featureController.js";
import { authenticateToken } from "../app/middlewares/authMiddlewares.js";
import jwt from "jsonwebtoken";

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authenticateToken, userController.getProfile);
router.get('/profiles', authenticateToken, userController.getAllProfiles);
router.put('/updateProfile/:id', authenticateToken, userController.updateUser);
router.delete('/deleteProfile/:id', authenticateToken, userController.deleteUser);



// //Create Route
// router.post('/createTask',taskController.createTask);

// //Read Route
// router.get('/readTask',taskController.readTask);

// //Update Route
// router.put('/updateTask',taskController.updateTask);

// //Delete Route
// router.delete('/deleteTask',taskController.deleteTask);

// //JWT token encode and decode route
// router.get("/feature1/TokenEncode",featureController.TokenEncode);
// router.get("/feature2/TokenDecode",featureController.TokenDecode);

// //Email route
// router.get("/feature3/EmailSend",featureController.Email);

// //Profile route
// router.get('/feature4/Profile',authMiddlewares,featureController.Profile);

// //cookie
// router.get('/feature5/CreateCookies',featureController.CreateCookies);
// router.get('/feature6/RemoveCookies',featureController.RemoveCookies);

// //File Upload route
// router.post('/feature7/FileUpload',featureController.FileUpload);

export default router; //export this file