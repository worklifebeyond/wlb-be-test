# Blog App - Users Service
Blog App is an application to manage your blog. It has two services : Users & Logs.

Its Users service has :

* RESTful endpoints for user registration, verification, and login.
* RESTful endpoints for CRUD operations of blog posts, likes, comments, and sub comments.
* JSON formatted response.

&nbsp;

## Endpoints
```
 - POST /users/register
 - GET  /users/verify
 - POST /users/login
 
 - POST   /posts
 - GET    /posts
 - GET    /posts/:id
 - PUT    /posts/:id
 - DELETE /posts/:id
 
 - POST   /comments
 - DELETE /comments/:id
 
 - POST   /sub-comments
 - DELETE /sub-comments/:id
 
 - POST   /likes
 - DELETE /likes/:id
```

## RESTful endpoints
### POST /users/register

> Register user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username": "<users's name>",
  "email": "<user's email>",
  "password": "<user's password>"
}
```

_Response (201 - Created)_
```
{
  "id": "<user's id>",
  "username": "<user's name>",
  "email": "<user's email>",
  "password": "<user's password>",
  "status": "registered",
  "createdAt": "<the time when the new user was created>",
  "updatedAt": "<the time when the new user was updated>"
}
```

_Response (400 - Bad Request)_
```
[
  "<error message 1>",
  "<error message 2>",
  ...,
  "<error message n>"
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal Server Error"
]
```
---
### GET /users/verify

> Verify user

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "User Verification Success"
}
```

_Response (400 - Bad Request)_
```
[
  "The verification link is invalid."
]
or
[
  "The account has already been verified."
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal Server Error"
]
```
---
### POST /users/login

> Login user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<user's email>",
  "password": "<user's password>"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<user's access token>",
  "user_id": "<user's id>"
}
```

_Response (400 - Bad Request)_
```
[
  "The email or password is invalid."
]
or
[
  "Please verify your account."
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal Server Error"
]
```
---
### POST /googleLogin

> Login user with Google account

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>",
  "UserId": "<your user id>"
}
```

_Response (400 - Bad Request)_
```
[
  "The Email or Password is invalid."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### POST /todos

> Create new todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize",
  "status": "ongoing",
  "due_date": "2020-01-29",
  "UserId": "1"
}
```

_Response (201 - Created)_
```
{
  "id": "1",
  "title": "Learn REST API",
  "description": "Learn how to create RESTful API with Express and Sequelize",
  "status": "ongoing",
  "due_date": "2020-01-29T00:00:00.000Z",
  "UserId": "1",
  "createdAt": "2020-01-27T07:15:12.149Z",
  "updatedAt": "2020-01-27T07:15:12.149Z",
}
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### GET /todos

> Get all todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": "1",
    "title": "Learn REST API",
    "description": "Learn how to create RESTful API with Express and Sequelize",
    "status": "ongoing",
    "due_date": "2020-01-29T00:00:00.000Z",
    "UserId": "1",
    "createdAt": "2020-01-27T07:15:12.149Z",
    "updatedAt": "2020-01-27T07:15:12.149Z",
  },
  {
    "id": "2",
    "title": "Learn API Documentation",
    "description": "Learn how to create API Documentation with REST standard",
    "status": "done",
    "due_date": "2020-01-29T00:00:00.000Z",
    "UserId": "1",
    "createdAt": "2020-01-28T07:15:12.149Z",
    "updatedAt": "2020-01-28T07:15:12.149Z",
  }
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### GET /todos/:id

> Get todos by UserId

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": "1",
    "title": "Learn REST API",
    "description": "Learn how to create RESTful API with Express and Sequelize",
    "status": "ongoing",
    "due_date": "2020-01-29T00:00:00.000Z",
    "UserId": "1",
    "createdAt": "2020-01-27T07:15:12.149Z",
    "updatedAt": "2020-01-27T07:15:12.149Z",
  },
  {
    "id": "2",
    "title": "Learn API Documentation",
    "description": "Learn how to create API Documentation with REST standard",
    "status": "done",
    "due_date": "2020-01-29T00:00:00.000Z",
    "UserId": "1",
    "createdAt": "2020-01-28T07:15:12.149Z",
    "updatedAt": "2020-01-28T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
[
  "The user with id <UserId> was not found."
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### PUT /todos/:id

> Update todo by todo_id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Learn Node",
  "description": "Learn how to create app with Express and Sequelize",
  "status": "ongoing",
  "due_date": "2020-01-30"
}
```

_Response (200 - OK)_
```
{
  "id": "1",
  "title": "Learn Node",
  "description": "Learn how to create app with Express and Sequelize",
  "status": "ongoing",
  "due_date": "2020-01-30",
  "UserId": "1",
  "createdAt": "2020-01-27T07:15:12.149Z",
  "updatedAt": "2020-01-29T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
[
  "The todo with id <todo id> was not found."
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### DELETE /todos/:id

> Delete todo by todo_id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "id": "2",
  "title": "Learn API Documentation",
  "description": "Learn how to create API Documentation with REST standard",
  "status": "done",
  "due_date": "2020-01-29",
  "UserId": "1",
  "createdAt": "2020-01-28T07:15:12.149Z",
  "updatedAt": "2020-01-28T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
[
  "The todo with id <todo id> was not found."
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
