
## tables du bug tracker
- users: name, email, password, role(dev, tester, manager, reporter, administrator);
- bugs: title, description, status, priority, user_id(user who reported the bug);
- projects: name, description, users_id(users working on the project) ;
- Comments(comments made on bugs): text, user_id(user who made the comment);
- attachment(This table stores the files that have been attached to the bugs, such as screenshots, logs and other files that are related to the bug): 


A user can have multiple bugs, but a bug can only have one user. (One-to-many)
A bug can have multiple comments, but a comment can only have one bug. (One-to-many)
A bug can have multiple attachments, but an attachment can only have one bug. (One-to-many)
A project can have multiple bugs, and a bug can have one project. (Many-to-one)
A project can have multiple users, and a user can have only one project (Many-to-one)

Reporter: Users with this role can only report bugs and view the bugs that they have reported. They can also add comments to the bugs.

Developer: Users with this role can view, update, and resolve bugs. They can also add comments to the bugs.

Tester: Users with this role can test the bugs and add comments, but they can't make changes to the bugs themselves.

Manager: Users with this role can view and manage all bugs, including assigning bugs to developers, changing the status of bugs, and viewing statistics about the bugs.

Administrator: Users with this role have full access to the system and can manage users, projects, bugs, and other settings.

A bug tracker web app typically includes several pages to display different types of information. Here are some common pages that might be found in a bug tracker app:

Login/Registration: Users can log in to the app or register for an account if they don't have one.

Dashboard: A page that displays an overview of the app, such as the number of bugs reported, the number of bugs resolved, and the number of bugs that are currently open.

Bug List: A page that displays a list of all the bugs that have been reported. Users can filter the list by status, priority, or project.

Bug Details: A page that displays detailed information about a specific bug, such as the title, description, status, priority, and the user who reported the bug.

New Bug: A page that allows users to report a new bug.

Edit Bug: A page that allows users to edit or update an existing bug.

Project List: A page that displays a list of all the projects that the bugs are associated with.

Project Details: A page that displays detailed information about a specific project, such as the name, description, and the users who are working on the project.

User List: A page that displays a list of all the users that are using the app.

User Details: A page that displays detailed information about a specific user, such as their name, email, and role.

These are just examples and it's possible that some pages might be different or named differently depending on the requirements of the app, or some pages might not be necessary.
