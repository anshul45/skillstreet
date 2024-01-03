import jwt from "jsonwebtoken";

const tokenMiddleware = (req, res, next) => {
  // Check if authorization header exists
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Token not provided" });
  }

  const token = authHeader.split(" ")[1]; // Assuming the format is 'Bearer <token>'

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid token format" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token payload to the request object
    req.user = decoded;

    //  next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default tokenMiddleware;
