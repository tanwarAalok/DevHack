const connectDatabase = require("../../db");
import NextCors from "nextjs-cors";
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {

  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  connectDatabase();

  // *********************************************************************
  const { number, password } = req.body;

  switch (req.method) {
    case "POST":
      try {
        const user = await User.findOne({ number });
        if (!user)
          return res.status(400).send("Invalid phone number or password");

        // Compare the hashed password with the provided password
        if (password != user.password)
              return res.status(400).send("Invalid phone number or password");
        
        const token = jwt.sign({ _id: user._id }, "abcd12345");
        res.setHeader("auth-token", token).send(token);  

      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Invalid request" });
      break;
  }
}
