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
        this.author_id = obj.author_id;
        this.bug_id = obj.bug_id;
    }

}

export default Project;