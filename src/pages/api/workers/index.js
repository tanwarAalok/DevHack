const connectDatabase = require("../../../utils/db");
import NextCors from "nextjs-cors";
const { Worker } = require("../../../models");

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  connectDatabase();

  // *********************************************************************

  switch (req.method) {
    case "GET":
      try {
        const data = await Worker.find({});
        res.status(200).json({ success: true, workers: data });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;
    
    case "PUT":
      try {
        await Worker.findByIdAndUpdate(req.body.id, req.body);
        res.status(200).json({ success: true});
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }

    default:
      res.status(400).json({ success: false, message: "Invalid request" });
      break;
  }
}
