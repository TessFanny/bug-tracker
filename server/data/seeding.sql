BEGIN;

TRUNCATE "user",  ticket, project, comment, project_has_user RESTART IDENTITY;

INSERT INTO "user"( firstname, lastname, email, password, role)
VALUES 
    ('Jean', 'Dupont', 'Jean.Dupont@tickettracker.com', 'secret', 'admin'),
    ('Jeanne', 'Auvin', 'Jeanne.Auvin@tickettracker.com', 'secret', 'admin')
   
;

 INSERT INTO project (title, description, project_author_id)
VALUES
     ('title project#1','description project#1', 1), 
     ('title project#2','description project#2', 2), 
     ('title project#3','description project#3', 2);

INSERT INTO ticket (title, description, status, priority, color,type, ticket_author_id, project_id )
VALUES 
    ('issue 1 ','issue 1 reported','open', 'high', 'ff0000', 'issue', 1,1), 
    ('issue #2', 'issue #2 reported','in progress','medium','ff7f00','error', 2, 1), 
    ('issue #3', 'issue #3 reported','closed','low', '008000','bug', 1, 1);


INSERT INTO comment ( text, comment_author_id, ticket_id)
VALUES ('text comment #1', 1, 1);




INSERT INTO project_has_user (user_id, project_id)
VALUES  
    (1, 2),
    (1, 3),
    (2, 2),
    (2, 3)
;

COMMIT;