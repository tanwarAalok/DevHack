const connectDatabase = require("../../utils/db");
import NextCors from "nextjs-cors";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

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
        client.verify.v2.services
          .create({ friendlyName: "My First Verify Service" })
              .then((service) => console.log(service.sid));
          
          client.verify.v2
            .services("VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
            .verifications.create({ to: "+15017122661", channel: "sms" })
            .then((verification) => console.log(verification.status));
          
          
          client.verify.v2
            .services("VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
            .verificationChecks.create({ to: "+15017122661", code: "123456" })
            .then((verification_check) =>
              console.log(verification_check.status)
            );
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Invalid request" });
      break;
  }
}
