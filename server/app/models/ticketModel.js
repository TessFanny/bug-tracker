import pool from "../services/dbClient.js";
import Core from "./coreModel.js";
import debug from "debug";
const log = debug("model:ticket");

class Ticket extends Core {
  static tableName = "ticket";

  constructor(obj) {
    super(obj);
    this.tableName = "ticket";
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.ticket_status = obj.ticket_status;
    this.priority = obj.priority;
    this.color = obj.color;
    this.type = obj.type;
    this.ticket_author_id = obj.ticket_author_id;
    this.project_id = obj.project_id;
  }

  //
  async getAllTicketsByProjectModel(project_id) {
    try {
      const preparedQuery = `SELECT distinct ticket.*,  concat("user".firstname ,' ' ,"user".lastname)as author, "user".id as user_id, "user".role from ticket
          JOIN project on project.id = ticket.project_id
    join "user" on "user".id = ticket.ticket_author_id
    where project.id = $1;`;
      const value = [project_id];
      const result = await pool.query(preparedQuery, value);

      if (!result.rows) {
        return null;
      }
      console.log(value);
      console.log(preparedQuery);
      return result.rows;
    } catch (error) {
      console.error(
        `Error in getAllTicketsByProjectModel() : ${error.message}`
      );
      throw error;
    }
  }
  // assign user to resolve a ticket
  async assignUsertoTicketModel(user_id, ticket_id) {
    try {
      const preparedQuery = `INSERT INTO ticket_has_user (user_id, ticket_id) VALUES ($1, $2) returning *
       `;
      const values = [user_id, ticket_id];
      const result = await pool.query(preparedQuery, values);
      const row = result.rows;
      console.log(preparedQuery);
      console.log(values);
      console.log(row);
      return row;
    } catch (error) {
      console.error(`Error in assignUsertoTicketModel() : ${error.message}`);
      throw error;
    }
  }

  // get user/ticket  to then verify if it already exist
  async getUserTicketModel(ticket_id, user_id) {
    try {
      const preparedQuery = `SELECT  from ticket_has_user
          
    where ticket_id = $1 and user_id = $2;`;

      const value = [ticket_id, user_id];
console.log(ticket_id, user_id);
      const result = await pool.query(preparedQuery, value);

      if (!result.rows) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      console.error(`Error in getUserTicketModel() : ${error.message}`);
      throw error;
    }
  }

  // get all the users working on resolving the bug ticket
  async getUsersOnTicketModel(ticket_id) {
    try {
      const preparedQuery = `SELECT distinct concat("user".firstname ,' ' ,"user".lastname)as contributor, "user".id, "user".role, "user".email from ticket
          JOIN ticket_has_user on ticket.id = ticket_has_user.ticket_id
    join "user" on "user".id = ticket_has_user.user_id
    where ticket.id = $1;`;

      const value = [ticket_id];
      console.log(value);
      console.log(preparedQuery);

      const result = await pool.query(preparedQuery, value);

      if (!result.rows) {
        return null;
      }

      return result.rows;
    } catch (error) {
      console.error(`Error in getUsersOnTicketModel() : ${error.message}`);
      throw error;
    }
  }
  async getTicketsUserIsAssignedToModel(user_id){
    try {
      const preparedQuery = `select distinct concat("user".firstname ,' ' ,"user".lastname)as author, * from ticket 
      join ticket_has_user ON ticket_has_user.ticket_id = ticket.id
      join "user" on "user".id = ticket.ticket_author_id
      where ticket_has_user.user_id = $1`;

      const value = [user_id];

      const result = await pool.query(preparedQuery, value);
     // console.log(value);
     // console.log(preparedQuery);
      if (!result.rows) {
        return null;
      }

      return result.rows;
    } catch (error) {
      console.error(`Error in getTicketsUserIsAssignedToModel() : ${error.message}`);
      throw error;
    }
  }

  // delete a ticket... also delete users assigned to the tickets
  async deleteTicketModel(ticket_id) {
    try {
      await pool.query('DELETE FROM "ticket_has_user" WHERE ticket_id = $1', [
        ticket_id,
      ]);
      console.log(ticket_id);
      const result = await pool.query(
        `DELETE FROM "${this.tableName}" WHERE id = $1`,
        [ticket_id]
      );
      return !!result.rowCount;
    } catch (error) {
      console.error(`Error in deleteTicketModel() : ${error.message}`);
      throw error;
    }
  }
}

export default Ticket;
