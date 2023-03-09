const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const DB_URL =
  "mongodb+srv://tanwarAalok:aalokvinay@cluster0.gnc3vqb.mongodb.net/?retryWrites=true&w=majority";

const connectDatabase = () => {
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((data) => {
    console.log(
      `>>>>>>> Mongodb connected with server ${data.connection.host} <<<<<<<<<<<`
    );
  });
};

module.exports = connectDatabase;

