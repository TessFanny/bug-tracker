import pool from '../services/dbClient.js';
import Core from'./coreModel.js'
import debug from 'debug'
const log = debug('model:project');


class Project extends Core {
    static tableName = 'project';

    constructor(obj){
        super(obj);
        this.tableName = 'project'
        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
        this.user_id = obj.user_id;
    }
   async getProjects(){
        try {
           const preparedQuery = {
              text: `SELECT project.* , concat("user".firstname ,' ' ,"user".lastname)as author from project
              JOIN "user" on project.user_id = "user".id
              group by project.id, "user".lastname ,"user".firstname;`
              
           };
     
           const result = await pool.query(preparedQuery);
     
           if (!result.rows) {
              return null;
           }
     
           return result.rows;
        } catch (error) {
           console.error(`Error in getAllPojects() : ${error.message}`)
              throw error;
        }
        
     }

}

export default Project;