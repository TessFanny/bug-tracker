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
        this.title = obj.title;
        this.text = obj.text;
        this.user_id = obj.user_id;
        this.bug_id = obj.bug_id;
    }

}

export default Comment;