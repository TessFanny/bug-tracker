import pool from '../services/dbClient.js';
import Core from'./coreModel.js'
import debug from 'debug'
const log = debug('model:role');


class Role extends Core {
    static tableName = 'role';

    constructor(obj){
        super(obj);
        this.tableName = 'role'
        this.id = obj.id;
        this.name = obj.name;
    }

    async findUserRole(user_id){
        try {
            const sqlQuery = `SELECT  "role".label as "role"  FROM "role"
            JOIN "user" ON role.user_id = "user".id
            WHERE "user".id = $1
            `
            const value = [user_id]
            const result = await pool.query(sqlQuery, value)
            if (!result.rows[0]) {
                return null;
             }       
             return result.rows[0];

        } catch (error) {
            console.error(`Error in findUserRole() : ${error.message}`);
             log(error);
            throw error;
        }
    }
  

}

export default Role;





// class Role extends Core {
//     static tableName = 'role';

//     constructor(obj){
//         super(obj);
//         this.id = obj.id;
//         this.name = obj.name;
//     }
//     // Permet de vÃ©rifier si le role existe
//     static async checkRole(req) {
//         try {
//             const sqlQuery = `SELECT * FROM "role" WHERE name=$1`;
//             const values = [req.name];
//             const response = await pool.query(sqlQuery, values);
//             if (response.rows.length == 1) {                        // si j'ai une rÃ©ponse c'est que l'utilisateur a Ã©tÃ© trouvÃ© en BDD
//                 return true;
//             }
//             else {
//                 return false;
//             }
//         } catch {
//             console.error(`Error in checkRole() : ${error.message}`);
//             log(error);
//             throw error;
//         }
//     }

// }