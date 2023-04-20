import pool from "../services/dbClient.js";
import Core from "./coreModel.js";
import debug from "debug";
const log = debug("model:project");

class Project extends Core {
  static tableName = "project";

  constructor(obj) {
    super(obj);
    this.tableName = "project";
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.user_id = obj.user_id;
  }
  async getProjects() {
    try {
      const preparedQuery = {
        text: `SELECT project.* , concat("user".firstname ,' ' ,"user".lastname)as author from project
              JOIN "user" on project.author_id = "user".id
              group by project.id, "user".lastname ,"user".firstname;`
      };

      const result = await pool.query(preparedQuery);

      if (!result.rows) {
        return null;
      }

      return result.rows;
    } catch (error) {
      console.error(`Error in getAllPojects() : ${error.message}`);
      throw error;
    }
  }
  async assignUsertoProjectModel(user_id, project_id) {
    try {

     const preparedQuery = `INSERT INTO project_has_user (user_id, project_id) VALUES ($1, $2) returning *
     `
    const values = [user_id, project_id]
     const result = await pool.query(preparedQuery, values);
     const row = result.rows;
     console.log(preparedQuery);
     console.log(values);
     console.log(row);
     return row;
     
   } catch (error) {
      console.error(`Error in assignUsertoProjectModel() : ${error.message}`)
         throw error;
   }
  }

  async getUsersOnProject(project_id){
    try {
      const preparedQuery = {
        text: `SELECT distinct concat("user".firstname ,' ' ,"user".lastname)as contributor, "user".id, "user".role, "user".email from project
        JOIN project_has_user on project.id = project_has_user.project_id
  join "user" on "user".id = project_has_user.user_id
  where project.id = $1;`,
      };
      const value = [project_id]
      
      const result = await pool.query(preparedQuery, value);

      if (!result.rows) {
        return null;
      }

      return result.rows;
    } catch (error) {
      console.error(`Error in getUsersOnProject() : ${error.message}`);
      throw error;
    }
  }
  async deleteProjectModel(project_id){
    try {
      await pool.query('DELETE FROM "project_has_user" WHERE project_id = $1', [project_id]);

    const result = await pool.query(
      `DELETE FROM "${this.tableName}" WHERE id = $1`,
      [project_id]
    );
    return !!result.rowCount;
  }
    catch (error) {
      
    }
  }
}

export default Project;
