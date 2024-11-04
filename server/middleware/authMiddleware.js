import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.User = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ error: error });
    }
  } else {
    res.status(401).json({ error: "Not Authorised, no token found" });
  }
};

export default protect;
