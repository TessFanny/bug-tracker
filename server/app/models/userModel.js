
import Core from '../models/coreModel.js';
import bcrypt from 'bcrypt';
import debug from 'debug';
import pool from "../services/dbClient.js";

const log = debug("model:userModel");


class User extends Core {
  static tableName = "user";

  constructor(obj) {
    super(obj);
    this.tableName = "user"
    this.id = obj.id;
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
    this.email = obj.email;
    this.password = obj.password;  
    this.refresh_token = obj.refresh_token
  }

  /**
   * Méthode d'instance permettant de vérifier en base de donnée la validatité du couple username/password
   * @returns boolean
   */
  async checkPassword() {
    try {
      const sqlQuery = 'SELECT * FROM "user" WHERE email=$1 AND password=$2';
      
      const salt = await bcrypt.genSalt(10);
      // password hashing
      const hashedPassword = await bcrypt.hash(this.password, salt);
    const values = [this.email, hashedPassword];

    const response = await pool.query(sqlQuery, values);
      console.log(sqlQuery);
    console.log(response.rows[0]);
    console.log(values);
    // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
    if (response.rows.length == 1) {
      // je mets à jour le this (user qui appelle le checkPassword)
      this.firstname = response.rows[0].firstname;
      this.lastname = response.rows[0].lastname;
      return true;
    } else {
      return false;
    }
    } catch (error) {
      console.error(`Erreur checkPassword() : ${error.message}`);
      log(error);
      throw error;
    }
    
  }
  async checkEmail() {
    try {
      const sqlQuery = 'SELECT * FROM "user" WHERE email=$1';
      const values = [this.email];
      const response = await pool.query(sqlQuery, values);
      // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
      if (response.rows.length == 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(`Erreur checkEmail() : ${error.message}`);
      log(error);
      throw error;
    }
  }

  async checkEmailLogin() {
    try {
      const sqlQuery = 'SELECT * FROM "user" WHERE email=$1';
      const values = [this.email];
      const response = await pool.query(sqlQuery, values);
      if (response.rows.length == 1) {
         // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
        if (await bcrypt.compare(this.password, response.rows[0].password)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error(`Error in checkEmailLogin() : ${error.message}`);
      log(error);
      throw error;
    }
  }
  async updateRefreshToken(refresh_token, id){
    try {
      const sqlQuery = 'UPDATE "user" SET refresh_token = $1 WHERE id = $2';
      const values = [refresh_token, id];
      const result = await pool.query(sqlQuery, values);
      const row = result.rows[0];
         return row;
    } catch (error) {
      console.error(`Error in updateRefreshToken() : ${error.message}`);
      log(error);
      throw error;
    }
  }
}

export default User;
