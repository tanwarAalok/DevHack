const connectDatabase = require("../../db");
import NextCors from "nextjs-cors";
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
  const { number } = req.body;
  switch (req.method) {
    case "POST":
      try {
        const user = await Worker.findOne({ number });
        if (user) return res.status(400).send("Worker already exists");

        const userDetails = await Worker.create(req.body);
        res.status(201).json({ success: true, user: userDetails });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Invalid request" });
      break;
  }
}
