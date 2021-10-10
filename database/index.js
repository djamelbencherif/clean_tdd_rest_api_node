const mongoose = require("mongoose");
// connect to mongodb
exports.connect = async () => {
  await mongoose.connect("mongodb://localhost:27017/node_tdd");
};

exports.itsOkMongo = () => {
  mongoose.connection.once("open", () => {
    console.log("connection ok");
  });
  mongoose.connection.on("error", () => {
    console.log("connection failed");
  });
};

exports.closed = async () => {
  await mongoose.disconnect();
};
