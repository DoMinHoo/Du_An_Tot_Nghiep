import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret is not defined in environment!");
    }

    const decoded = jwt.verify(token, secret);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    req.user_id = decoded.id;
    req.user = user; // optional, full user object
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    return res.status(401).json({ message: 'Invalid token: ' + error.message });
  }
};

export { authMiddleware };
