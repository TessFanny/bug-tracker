import pool from '../services/dbClient.js';
import Core from'./coreModel.js'
import debug from 'debug'
const log = debug('model:comment');


class Comment extends Core {
    static tableName = 'comment';

    constructor(obj){
        super(obj);
        this.tableName = 'comment'
        this.id = obj.id;
        this.text = obj.text;
        this.user_id = obj.user_id;
        this.ticket_id = obj.ticket_id;
    }
   async getTicketCommentsModel(ticket_id){
        try {
            const preparedQuery = `SELECT  comment.*, concat("user".firstname ,' ' ,"user".lastname)as author, "user".id as user_id from comment
                JOIN ticket on ticket.id = comment.ticket_id
          join "user" on "user".id = comment_author_id
          where ticket.id = $1;`;
            const value = [ticket_id];
            const result = await pool.query(preparedQuery, value);
      
            if (!result.rows) {
              return null;
            }
      
            return result.rows;
          } catch (error) {
            console.error(
              `Error in getTicketCommentsModel() : ${error.message}`
            );
            throw error;
          }
    }

}

export default Comment;