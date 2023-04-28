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

}

export default Comment;