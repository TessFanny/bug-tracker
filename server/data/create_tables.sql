
BEGIN;
DROP TABLE IF EXISTS "user",  ticket, comment, project,  project_has_user CASCADE;

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
    author_id int REFERENCES "user"(id),
    created_at  TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    updated_at TEXT
);
CREATE TABLE ticket (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text not null,
    description text NOT NULL,
    status text not null,
    priority text not null,
    color text not null,
    user_id int REFERENCES "user"(id),
    project_id int REFERENCES project(id),
    created_at  TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    updated_at TEXT 
);


CREATE TABLE comment (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text ,
    text text ,
    user_id  int REFERENCES "user"(id) ON DELETE CASCADE,
    ticket_id  int REFERENCES ticket(id) ON DELETE CASCADE,
    created_at  TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris', 'DD-MM-YYYY HH24:MI:SS'),
    updated_at TEXT
);

CREATE TABLE project_has_user (   
    user_id int REFERENCES "user"(id),
    project_id int REFERENCES project(id),  
    id PRIMARY KEY (student_id, course_id)  
);

COMMIT;