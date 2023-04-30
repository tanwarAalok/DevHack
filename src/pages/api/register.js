const connectDatabase = require("../../utils/db");
import NextCors from "nextjs-cors";
const User = require("../../models/userModel");
const Worker = require("../../models/workerModel");


export default async function handler(req, res) {
  // await runMiddleware(req, res, cors);
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  connectDatabase();

  // *********************************************************************
  const { number, role } = req.body;
  switch (req.method) {
    case "POST":
      try {
        if (role === "user") {
          const newUser = await User.findOne({ number });
          if (newUser) return res
            .status(403)
            .json({ success: false, message: "User already exists !" });

          const userDetails = await User.create(req.body);
          res
            .status(201)
            .json({
              success: true,
              data: userDetails,
              message: "Successfully registered !",
            });
          
        } else if (role === "worker") {
          const newWorker = await Worker.findOne({ number });
          if (newWorker) return res
            .status(403)
            .json({ success: false, message: "Worker already exists !" });

            const workerDetails = await Worker.create(req.body);
          res
            .status(201)
            .json({
              success: true,
              data: workerDetails,
              message: "Successfully registered !",
            });
        }
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Invalid request" });
      break;
  }
}
