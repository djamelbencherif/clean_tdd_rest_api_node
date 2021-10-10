const http = require("http");
const PORT = process.env.PORT ? process.env.PORT : 3000;
const app = require("./app");
const { connect, itsOkMongo } = require("./database");
// connect mongo
connect();
itsOkMongo();
// create server
http.createServer(app).listen(PORT, () => {
  console.log(`server run in ${PORT}`);
});
