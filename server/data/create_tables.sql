
BEGIN;
DROP TABLE IF EXISTS "user",  ticket, comment, project,  project_has_user, ticket_has_user CASCADE;

CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text NOT NULL ,
    lastname text NOT NULL ,
    email text NOT NULL UNIQUE,
    password  text NOT NULL,
    role text default 'developer' 
);


CREATE TABLE project (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text not null,
    description text NOT NULL,
    project_author_id int REFERENCES "user"(id),
    created_at  TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    updated_at TEXT
);

CREATE TABLE ticket (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text not null,
    description TEXT NOT NULL,
    ticket_status TEXT not null,
    priority TEXT not null,
    color TEXT not null,
    type TEXT not NULL,
    ticket_author_id int REFERENCES "user"(id),
    project_id int REFERENCES project(id),
    created_at  TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    updated_at TEXT 
);


CREATE TABLE comment (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    text TEXT NOT NULL ,
    comment_author_id  int REFERENCES "user"(id) ON DELETE CASCADE,
    ticket_id  int REFERENCES ticket(id) ON DELETE CASCADE,
    created_at  TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    updated_at TEXT
);

CREATE TABLE project_has_user (   
    user_id int REFERENCES "user"(id) ON DELETE CASCADE,
    project_id int REFERENCES project(id) ON DELETE CASCADE,  
    CONSTRAINT pk_project_has_user PRIMARY KEY (user_id, project_id)   
);

CREATE TABLE ticket_has_user (   
    user_id int REFERENCES "user"(id) ON DELETE CASCADE,
    ticket_id int REFERENCES ticket(id) ON DELETE CASCADE,  
     CONSTRAINT pk_ticket_has_user PRIMARY KEY (user_id, ticket_id) 
);

COMMIT;