import jwt from "jsonwebtoken";

interface UserPayload {
  userId: string;
  role: "admin" | "mentor" | "mentee";
}

const generateToken = (user: UserPayload) => {
  return jwt.sign(
    {
      userId: user.userId,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};

export default generateToken;
