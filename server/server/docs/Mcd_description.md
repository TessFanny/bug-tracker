```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);


CREATE TABLE bugs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(255) NOT NULL,
    priority VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    bug_id INTEGER NOT NULL REFERENCES bugs(id)
);

CREATE TABLE attachments (
    id SERIAL PRIMARY KEY,
    path VARCHAR(255) NOT NULL,
    bug_id INTEGER NOT NULL REFERENCES bugs(id)
);

CREATE TABLE project_users (
    project_id INTEGER REFERENCES projects(id),
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (project_id, user_id)
);
```
