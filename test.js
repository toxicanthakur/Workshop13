const express = require("express");
const jwt = require("jsonwebtoken");
const cron = require("node-cron");
const fs = require("fs");
const authorize =require("./authorize.js")
const config = require("./config");
const app = express();
app.use(express.json());
//cron
function logData() {
  const currentTime = new Date().toString();
  const data = `Data logged at ${currentTime}`;
  console.log(data);
  fs.appendFileSync("log.txt", data + "\n");
}
cron.schedule("*/1 * * * *", logData);
console.log("running a task every minute");
// Request a token
app.post("/token", (req, res) => {
  const payload = {
    name: "Tushar",
    scopes: "user:read"
  };

  const token = jwt.sign(payload, config.JWT_SECRET);
  res.send(token);
});

app.post("/user", authorize("user:read"), (req, res) => {
  res.send("User Information");
});
app.get("/", (req, res) => {
  res.send("hey buddy");
});
app.listen(2000);
