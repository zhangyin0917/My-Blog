const mysql = require("mysql");
const GenID = require("../utils/SnowFlake");

const genid = new GenID({ WorkerId: 1 });
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "blog",
});

module.exports = { db, genid };
