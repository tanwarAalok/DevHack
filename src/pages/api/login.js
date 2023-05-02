const connectDatabase = require("../../utils/db");
import NextCors from "nextjs-cors";
const User = require("../../models/userModel");
const Worker = require("../../models/workerModel");

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
        const data =
          (await User.findOne({ number })) ||
          (await Worker.findOne({ number }));
        if (!data)
          return res
            .status(403)
            .json({ success: false, message: "User not found !"});

        // Compare the hashed password with the provided password
        if (password != data.password)
          return res
            .status(403)
            .json({ success: false, message: "Password does not match !" });;

        // const token = jwt.sign({ _id: user._id }, "abcd12345");
        res.status(201).json({
          success: true,
          data: data,
          message: "Successfully login !",
        });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Invalid request" });
      break;
  }
}
