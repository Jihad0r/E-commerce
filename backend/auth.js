import { generateTokensAndSetCookie } from "./generateTokensAndSetCookie.js";
import User from "./auth.modle.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const isUserExist = await User.findOne({ username });
    if (isUserExist) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (!/^[a-zA-Z]+$/.test(username)) {
      return res.status(400).json({ error: "Username must contain only letters" });
    }

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "must be 8-16 characters long, with aA-zZ 0-9 @$!%*?&"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    generateTokensAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Signup Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    generateTokensAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      crat: user.crat,
    });
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const myaccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("My Account Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
