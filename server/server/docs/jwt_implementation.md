### JSON Web Token (JWT) is a popular method for authenticating and authorizing users in a web application. Here's an example of how you might use JWT to authorize and authenticate users in a bug tracker app:

On the login page, the user will enter their email and password. The app will send a request to the server with this information.

On the server, the app will use the email and password to look up the user in the database. If the email and password match a user in the database, the server will create a JWT that contains the user's ID and role.

The server will send the JWT back to the client as a response to the login request.

On the client, the app will store the JWT in local storage or cookie.

On subsequent requests to the server, the app will include the JWT in the authorization header of the request.

On the server, the app will use a middleware function to check the JWT on every request. The middleware function will decode the JWT and check that it is valid. If the JWT is valid, the middleware function will attach the user's ID and role to the request, so that the app can use this information to determine what the user is allowed to do.

If the JWT is not valid, the middleware function will return a 401 Unauthorized response to the client.

To log out, the app will delete the JWT from local storage or cookie, so that the user will have to log in again to access the protected routes.

JWT is a secure way of handling user authentication and authorization because it is signed and encrypted, which means that it can't be tampered with or read by unauthorized parties. However, it's important to use HTTPS to prevent man-in-the-middle attacks and to store JWT in HttpOnly and Secure cookie.
Also, you should be aware of the token expiration and refresh tokens strategy to handle it accordingly.


npm install jsonwebtoken
```js
//In the login route, when the user successfully logs in, generate a JWT with the user's ID and role as the payload and a secret key as the signature:
const jwt = require('jsonwebtoken');
const secret = 'yoursecretkey';

app.post('/login', (req, res) => {
    // check if the email and password match a user in the database
    // ...
    if (user) {
        // generate the JWT with the user's ID and role as the payload
        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, secret);

        // send the JWT to the client
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }
});


    //In a middleware function, check the JWT on every protected route:
app.use((req, res, next) => {
    // check if there's a JWT in the authorization header
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        // verify the JWT and attach the user's ID and role to the request
        try {
            const decoded = jwt.verify(token, secret);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    }
});

//In the protected routes, use the user's ID and role to determine what the user is allowed to do:
app.get('/protected', (req, res) => {
    if (req.user.role === 'admin') {
        // do something for admins
        res.json({ message: 'Welcome Admin' });
    } else {
        // do something for non-admins
        res.json({ message: 'Welcome User' });
    }
});
//To log out, delete the JWT from the client:
app.post('/logout', (req, res) => {
    // delete the JWT from local storage or cookie
    // ...
    res.json({ message: 'You are logged out' });
});

```