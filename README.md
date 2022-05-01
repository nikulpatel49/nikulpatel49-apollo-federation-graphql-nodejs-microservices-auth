# GraphQL Nodejs Authentication and crud operation with Apollo Federation

Simple Demo Application

**API** Built with Apollo Federation Microservices + NodeJs + Express + GraphQL + MongoDB + Passport.

## 📝 Features

-   [x] User Register - Login - Reset Password with Email - Change Password
-   [x] List User with Pagination - Delete - Update - Create User with Specific Role
-   [x] List of Roles - Delete - Update - Create

## ▶️ Running

-   Clone repo `git clone https://github.com/nikulpatel49/apollo-federation-graphql-nodejs-microservice-auth.git`
-   Install NPM modules `npm install`
-   Modify `/.env` for Api port (optional)
-   Run API `npm run server`, browse GraphiQL at http://localhost:4000/graphql

## Sample GraphQL Queries & Mutation

<table width="100%" style="width: 100%">
    <tbody>
        <tr valign="top">
            <td width="50%" style="width: 50%">
                <p>Query - Get User List</p>
                <pre>
            query {
                users {
                    _id,
                    name,
                    email
                }
            }
            Set http Header
            {
            "Authorization": "Bearer eyJhbGciO9..................."
            }
                </pre>
            </td>
            <td width="50%" style="width: 50%">
                <p>Response</p>
                <pre>
{
  "data": {
    "users": [
        {
            "_id": "6268e2d3b0ab904a787c8b7d",
            "name": "user0",
            "email": "user0@user.com"
        },
        {
            "_id": "626e36045caeed669061b1ec",
            "name": "Nikul Patel",
            "email": "nikulpateletc49@gmail.com"
        },
    ]
  }
}
                </pre>
            </td>
        </tr>
        <tr></tr>
        <tr valign="top">
            <td>
                <p>Query - Get User by Param</p>
                <pre>
query {
    user(_id: "626e36045caeed669061b1ec"){
        _id,
        name,
        email
    }
}
Set http Header
{
  "Authorization": "Bearer eyJhbGciO9..................."
}
                </pre>
            </td>
            <td>
                <p>Response</p>
                <pre>
{
  "data": {
        "user": {
        "_id": "626e36045caeed669061b1ec",
        "name": "Nikul Patel",
        "email": "nikulpateletc49@gmail.com"
        }
    }
}
                </pre>
            </td>
        </tr>
        <tr></tr>
        <tr valign="top">
            <td>
                <p>Mutation - Register</p>
                <pre>
mutation {
    register(
        register: { 
            name: "Nikul Patel", 
            email: "nikulpateletc49@gmail.com",
            password: "user"
        }
    ) {
    status
    message
  }
}
                </pre>
            </td>
            <td>
                <p>Response</p>
                <pre>
{
    "data": {
        "register": {
            "status": true,
            "message": "User has been successfully created",
        }
    }
}
                </pre>
            </td>
        </tr>
        <tr></tr>
        <tr valign="top">
            <td>
                <p>Mutation - Login</p>
                <pre>
mutation {
    login(email: "nikulpateletc49@gmail.com", password: "user") {
        status
        message
        token
    }
}
                </pre>
            </td>
            <td>
                <p>Response</p>
                <pre>
{
    "data": {
        "login": {
            "status": true,
            "message": "successfully logged user",
            "token": "Bearer eyJhbGciO9..................."
        }
    }
}
                </pre>
            </td>
        </tr>
        <tr valign="top">
            <td>
                <p>Mutation - Delete User</p>
                <pre>
mutation {
  deleteUser(_id: "626e36045caeed669061b1ec"){
    status,
    message,
  }
}
Set http Header
{
  "Authorization": "Bearer eyJhbGciO9..................."
}
                </pre>
            </td>
            <td>
                <p>Response</p>
                <pre>
{
  "data": {
    "deleteUser": {
      "status": true,
      "message": "User has been successfully deleted"
    }
  }
}
                </pre>
            </td>
        </tr>
    </tbody>
</table>