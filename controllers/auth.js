import bcrypt from "bcryptjs";
import User from "../models/User.js";
import createError from "../helpers/createError.js";
import { generateToken } from "../helpers/createToken.js";

// Registration
export const register = async (req, res, next) => {
  try {
    const { username, fullName, password, email, role = "R1" } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    // Check if the user already exists by email or username
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) return next(createError(422, "Username or Email already exists"));

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      fullName,
      role, // Assign role during registration
    });

    await newUser.save();
    res.status(201).send({ success: true, message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by username
    const user = await User.findOne({ email });

    if (!user) return next(createError(422, "Invalid username or password"));

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(createError(422, "Invalid username or password"));

    // Generate token including the role
    const token = generateToken({ id: user._id, role: user.role });

    // Remove password before sending the response
    const { password: userPassword, ...otherDetails } = user._doc;

    // Set cookie for token
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(Date.now() + 3600000 * 7), // 7-hour expiration
    });

    // Respond with user details
    res.status(200).send({ success: true, message: "Logged in successfully", user: otherDetails });
  } catch (error) {
    next(error);
  }
};
