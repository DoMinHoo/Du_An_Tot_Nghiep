import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied! No token provided." });
    }
    // Xác thực token
    const decoded = jwt.verify(token, "duantotnghiep");

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { authMiddleware };
