const fs = require("fs");
const { join } = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();

// const dbFile = JSON
//   .parse
//   // fs.readFileSync(join(__dirname, "./data.json.js"), "utf8")
//   ();

const router = jsonServer.router(join(__dirname, "data.json"));
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8080;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log("JSON Server is running");
});
