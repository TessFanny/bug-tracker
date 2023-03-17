const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool();
pool.connect()
module.exports = pool; 

