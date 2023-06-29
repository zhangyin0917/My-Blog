const mysql = require('mysql')
const GenID = require('../utils/SnowFlake')
const { DADTEBASE } = require('../config')
const genid = new GenID({ WorkerId: 1 })
const db = mysql.createPool({
  host: DADTEBASE.host,
  user: DADTEBASE.user,
  password: DADTEBASE.password,
  database: DADTEBASE.datebase,
})

module.exports = { db, genid }
