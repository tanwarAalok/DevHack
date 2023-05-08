const connectDatabase = require("../../utils/db");
import NextCors from "nextjs-cors";
const { Booking, Worker, User } = require("../../models");

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  connectDatabase();

  // *********************************************************************
  const { workerId, userId, date, time, address } = req.body;

  switch (req.method) {
    case "POST":
      try {
        const worker = await Worker.findById(workerId);
        const user = await User.findById(userId);

        if (!worker || !user) {
          res
            .status(400)
            .json({
              success: false,
              data: {},
              message: "Something went wrong",
            });
          }
          
          //*TODO : Check if time is colliding with other bookings.

        const newBooking = new Booking({ date, time , address});
        newBooking.user = userId;
        newBooking.worker = workerId;

        user.bookings.push(newBooking);
        worker.bookings.push(newBooking);

        await newBooking.save();
        await user.save();
        await worker.save();

        res.status(201).json({
          success: true,
          data: newBooking,
          message: "Successfully Booked Worker !",
        });
      } catch (err) {
        res
          .status(400)
          .json({ success: false, data: {}, message: err.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Invalid request" });
      break;
  }
}
