import pool from '../services/dbClient.js';
import Core from'./coreModel.js'
import debug from 'debug'
const log = debug('model:ticket');


class Ticket extends Core {
    static tableName = 'ticket';

    constructor(obj){
        super(obj);
        this.tableName = 'ticket'
        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
        this.status = obj.status;
        this.priority = obj.priority;
        this.color = obj.color;
        this.user_id = obj.user_id;
        this.project_id = obj.project_id;
    }

}

export default Ticket;