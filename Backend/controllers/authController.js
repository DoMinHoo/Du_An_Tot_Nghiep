import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema } from "../validation/auth";

async function register(req, res) {
  try {
    const { email, password, first_name, last_name, phone, address, role } =
      req.body;

    // Kiểm tra dữ liệu hợp lệ
    const { error } = registerSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorsMessage = error.details.map((err) => err.message);
      return res.status(400).json({ message: errorsMessage });
    }

    // Kiểm tra email đã tồn tại
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email existed" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo mới user
    const newUser = {
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone,
      address,
      role: role || "customer", // nếu không truyền thì mặc định
    };

    const userCreated = await userModel.create(newUser);

    // Xoá mật khẩu khỏi phản hồi
    res.json({ ...userCreated.toObject(), password: undefined });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    //Kiem tra du lieu hop le
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password is Required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password min 6 character" });
    }
    // Tìm user theo email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    console.log({ isMatch });
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Tạo token JWT
    const token = jwt.sign({ id: user._id }, "hoadv21", {
      expiresIn: "1w",
    });
    console.log(token);

    // remove password response
    res.json({ ...user.toObject(), password: undefined, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { register, login };
//dfgdfg