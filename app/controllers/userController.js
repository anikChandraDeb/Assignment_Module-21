import {DecodeToken, EncodeToken} from "../utility/tokenUtility.js";
import userModel from "../models/userModel.js";

// Register User
export const registerUser = async (req, res) => {
    const { firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup } = req.body;
    
    try {
      const existingUser = await userModel.findOne({ phoneNumber });
      if (existingUser) {
        return res.status(400).json({ message: 'Phone number already registered' });
      }
  
      const newUser = new userModel({ firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

// Login User with Phone and Password
export const loginUser = async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
      const user = await userModel.findOne({ phoneNumber });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = EncodeToken(user._id);
      res.cookie('authToken', token, { httpOnly: true });
      res.json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Get Single User Profile
export const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Get All User Profiles
export const getAllProfiles = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Update User
export const updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Delete User
  export const deleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
