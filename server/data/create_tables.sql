
BEGIN;
DROP TABLE IF EXISTS "user", "role", permission, bug, comment, project, role_has_permission, project_has_user;

CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text NOT NULL ,
    lastname text NOT NULL ,
    email text NOT NULL UNIQUE,
    password  text NOT NULL 
);

CREATE TABLE permission (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL      
);

CREATE TABLE "role"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL ,
    user_id int REFERENCES "user"(id)
);

CREATE TABLE bug (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description text NOT NULL,
    status text not null,
    priority text not null,
    color text not null,
    created_by int REFERENCES "user"(id),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ 
);

CREATE TABLE comment (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text ,
    text text ,
    user_id  int REFERENCES "user"(id) ON DELETE CASCADE,
    bug_id  int REFERENCES bug(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ 
);
CREATE TABLE project (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text not null,
    description text NOT NULL,
    author_id int REFERENCES "user"(id),
    bug_id int REFERENCES bug(id),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ 
);

CREATE TABLE role_has_permission (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role_id int REFERENCES "role"(id) ,
    permission_id int REFERENCES permission(id)       
);


CREATE TABLE project_has_user (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id int REFERENCES "user"(id),
    project_id int REFERENCES project(id)    
);

COMMIT;