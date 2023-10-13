
//import { Pool} from 'pg'
import pkg from 'pg';
const { Pool} = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool();
pool.connect()
export default pool; 

