BEGIN;

TRUNCATE "user", permission, bug, project, "role", comment, role_has_permission,project_has_user RESTART IDENTITY;
INSERT INTO "user"( firstname, lastname, email, password)
VALUES 
    ('Jean', 'Dupont', 'Jean.Dupont@bugtracker.com', 'password'),
    ('Jeanne', 'Auvin', 'Jeanne.Auvin@bugtracker.com', 'password'),
    ('Marie', 'Dupont', 'Marie.Dupont@bugtracker.com', 'password'),
    ('Michel', 'Auvin', 'Michel.Auvin@bugtracker.com', 'password')
;

INSERT INTO "role"(label, user_id)
VALUES 
     ('admin', 1),
     ('project manager', 2), 
     ('developer', 3), 
     ('submitter', 4)
    ;

INSERT INTO permission(label)
VALUES 
     ('permission_add_bug'),
     ('permission_add_project') , 
     ('permission_add_comment'), 
     ('permission_add_member_to_project'), 
     ('permission_manage_role'), 
     ('permission_update_user_profile');



INSERT INTO bug (description, status, priority, color, created_by )
VALUES 
    ('issue 1 reported','open', 'high', 'ff0000', 1), 
    ('issue #2 reported','in progress','medium','ff7f00', 2), 
    ('issue #3 reported','closed','low', '008000', 1);


INSERT INTO comment (title, text, user_id, bug_id)
VALUES ('comment #1', 'text comment #1', 1, 1);

INSERT INTO project (title, description, author_id, bug_id)
VALUES
     ('title project#1','description project#1', 1, 1), 
     ('title project#2','description project#2', 2, 2), 
     ('title project#3','description project#3', 2, 2);

INSERT INTO role_has_permission (role_id, permission_id )
VALUES (1, 1),
        (1, 2), 
        (1, 3),
        (1, 4), 
        (1, 5), 
        (1, 6), 
        (2, 1), 
        (2, 2), 
        (2, 3), 
        (2, 4),
        (3, 1),
        (3, 2),
        (3, 3),
        (4, 1),
        (4, 2)   
        ;

INSERT INTO project_has_user (user_id, project_id)
VALUES  
    (1, 2),
    (1, 3),
    (2, 2),
    (2, 3)
;

COMMIT;