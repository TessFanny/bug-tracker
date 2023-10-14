
//import { Pool} from 'pg'
import pkg from 'pg';
const { Pool} = pkg;
import dotenv from 'dotenv';
dotenv.config();
const connectionString = process.env.DB_URL;
const pool = new Pool({
    connectionString:connectionString
});
pool.connect()
export default pool; 

