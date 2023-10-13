const mongoose = require("mongoose");

//Database bağlanma işlemi
const db = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongoDB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = db;
