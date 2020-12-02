# Blog App - Users Service API
Blog App is an application to manage your blog. It has two services : Users & Logs.

This document explains the Users services.

The Users service has :

* RESTful endpoints for user registration, verification, and login; and get all users data.
* RESTful endpoints for CRUD, search, find-by-id, and find-by-user-id operations of blog posts.
* RESTful endpoints for Create and Delete operations of likes, comments, and sub comments.
* JSON formatted response.

&nbsp;

## Endpoints
```
 - GET  /users
 - POST /users/register
 - GET  /users/verify?token=<account_verification_token>
 - POST /users/login
 
 - POST   /posts
 - GET    /posts
 - GET    /posts/search?title=<search_by_title>&sort=<option_1,option_2,...,option_n>&order=<asc_or_desc>
 - GET    /posts/:id
 - GET    /posts/user/:id
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
### GET /posts

> Get all blog posts

_Request Header_
```
{
  "access_token": "<user's access token>"
}
*tidak wajib, hanya untuk keperluan logging data user
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": <user's id>,
    "username": "<user's name>",
    "email": "<user's email>",
    "password": "<user's hashed password>",
    "status": "<user's account status>",
    "createdAt": "<the time when the user was created>",
    "updatedAt": "<the time when the user was updated>",
    "Posts": [
      {
        "id": <post id>,
        "title": "<post title>",
        "content": "<post content>",
        "UserId": <user's id>,
        "createdAt": "<the time when the post was created>",
        "updatedAt": "<the time when the post was updated>",
        "Likes": [
          {
            "id": <like id>,
            "PostId": <post id>,
            "UserId": <user's id>
          },
          ...
        ],
        "Comments": [
          {
            "id": <comment id>,
            "content": "<user's comment>",
            "PostId": <post id>,
            "UserId": <user's id>,
            "SubComments": [
              {
                "id": <sub comment id>,
                "content": "<user's sub comment>",
                "CommentId": <comment id>,
                "UserId": <user's id>
              },
              ...
            ]
          },
          ...
        ]
      },
      ...
    ]
  },
  ...
]
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal Server Error"
]
```
---
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
  "message": "User Registration Success",
  "verification_token": "<account verification token>",
  "data": {
    "id": <user's id>,
    "username": "<user's name>",
    "email": "<user's email>",
    "password": "<user's hashed password>",
    "status": "registered",
    "createdAt": "<the time when the user was created>",
    "updatedAt": "<the time when the user was updated>"
  }
}
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal Server Error"
]
```
---
### GET /users/verify?token=<verification_token>

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
  "message": "User Verification Success",
  "data": {
    "id": <user's id>,
    "username": <"user's name">,
    "email": "<user's email>",
    "password": "<user's hashed password>",
    "status": "active",
    "createdAt": "<the time when the user was created>",
    "updatedAt": "<the time when the user was updated>"
  }
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
  "message": "User Login Success",
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
### POST /posts

> Create blog post

_Request Header_
```
{
  "access_token": "<user's access token>"
}
```

_Request Body_
```
{
  "title": "<post title>",
  "content": "<post content>"
}
```

_Response (201 - Created)_
```
{
  "id": <post id>,
  "title": "<post title>",
  "content": "<post content>",
  "UserId": <user's id>,
  "createdAt": "<the time when the post was created>",
  "updatedAt": "<the time when the post was updated>"
}
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal Server Error"
]
```
---
### GET /posts

> Get all blog posts

_Request Header_
```
{
  "access_token": "<user's access token>"
}
*tidak wajib, hanya untuk keperluan logging data user
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": <post id>,
    "title": "<post title>",
    "content": "<post content>",
    "UserId": <user's id>,
    "createdAt": "<the time when the post was created>",
    "updatedAt": "<the time when the post was updated>",
    "User": {
      "id": <user's id>,
      "username": "<user's name>",
      "email": "<user's email>",
      "password": "<user's hashed password>",
      "status": "<user's account status>",
      "createdAt": "<the time when the user was created>",
      "updatedAt": "<the time when the user was updated>"
    },
    "Likes": [
      {
        "id": <like id>,
        "PostId": <post id>,
        "UserId": <user's id>,
        "createdAt": "<the time when the like was created>",
        "updatedAt": "<the time when the like was updated>"
      },
      ...
    ],
    "Comments": [
      {
        "id": <comment id>,
        "content": "<user's comment>",
        "PostId": <post id>,
        "UserId": <user's id>,
        "createdAt": "<the time when the comment was created>",
        "updatedAt": "<the time when the comment was updated>",
        "SubComments": [
          {
            "id": <sub comment id>,
            "content": "<user's sub comment>",
            "CommentId": <comment id>,
            "UserId": <user's id>,
            "createdAt": "<the time when the sub comment was created>",
            "updatedAt": "<the time when the sub comment was updated>"
          },
          ...
        ]
      },
      ...
    ]
  },
  ...
]
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal Server Error"
]
```
---
### GET /posts/search?title=<search_by_title>&sort=<option_1,option_2,...,option_n>&order=<asc_or_desc>

> Get blog posts with filter options
>
> This feature supports multiple sort options with hierarchical order of importance. The first sort option is the most important, and the last sort option is the least important.
>
> Available sort options : 
>
> * 'date' : to sort by the date upon the creation of the post
> * 'user' : to sort by the username of the post owner
> * 'most_comments' : to sort by the total comments each post has
> * 'most_likes' : to sort by the total likes each post has
>
> Available order options :
>
> * 'asc' : ascending order to all sort options
> * 'desc' : descending order to all sort options

_Request Header_
```
{
  "access_token": "<user's access token>"
}
*tidak wajib, hanya untuk keperluan logging data user
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "count": <total search results>,
  "data": [
    {
      "id": <post id>,
      "title": "<post title>",
      "content": "<post content>",
      "UserId": <user's id>,
      "createdAt": "<the time when the post was created>",
      "updatedAt": "<the time when the post was updated>",
      "User": {
        "id": <user's id>,
        "username": "<user's name>",
        "email": "<user's email>",
        "password": "<user's hashed password>",
        "status": "<user's account status>",
        "createdAt": "<the time when the user was created>",
        "updatedAt": "<the time when the user was updated>"
      },
      "Likes": [
        {
          "id": <like id>,
          "PostId": <post id>,
          "UserId": <user's id>,
          "createdAt": "<the time when the like was created>",
          "updatedAt": "<the time when the like was updated>"
        },
        ...
      ],
      "Comments": [
        {
          "id": <comment id>,
          "content": "<user's comment>",
          "PostId": <post id>,
          "UserId": <user's id>,
          "createdAt": "<the time when the comment was created>",
          "updatedAt": "<the time when the comment was updated>",
          "SubComments": [
            {
              "id": <sub comment id>,
              "content": "<user's sub comment>",
              "CommentId": <comment id>,
              "UserId": <user's id>,
              "createdAt": "<the time when the sub comment was created>",
              "updatedAt": "<the time when the sub comment was updated>"
            },
            ...
          ]
        },
        ...
      ]
    },
    ...
  ]
}
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal Server Error"
]
```
---
### GET /posts/:id

> Get a blog post by its id

_Request Header_
```
{
  "access_token": "<user's access token>"
}
*tidak wajib, hanya untuk keperluan logging data user
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "id": <post id>,
  "title": "<post title>",
  "content": "<post content>",
  "UserId": <user's id>,
  "createdAt": "<the time when the post was created>",
  "updatedAt": "<the time when the post was updated>",
  "User": {
    "id": <user's id>,
    "username": "<user's name>",
    "email": "<user's email>",
    "password": "<user's hashed password>",
    "status": "<user's account status>",
    "createdAt": "<the time when the user was created>",
    "updatedAt": "<the time when the user was updated>"
  },
  "Likes": [
    {
      "id": <like id>,
      "PostId": <post id>,
      "UserId": <user's id>,
      "createdAt": "<the time when the like was created>",
      "updatedAt": "<the time when the like was updated>"
    },
    ...
  ],
  "Comments": [
    {
      "id": <comment id>,
      "content": "<user's comment>",
      "PostId": <post id>,
      "UserId": <user's id>,
      "createdAt": "<the time when the comment was created>",
      "updatedAt": "<the time when the comment was updated>",
      "SubComments": [
        {
          "id": <sub comment id>,
          "content": "<user's sub comment>",
          "CommentId": <comment id>,
          "UserId": <user's id>,
          "createdAt": "<the time when the sub comment was created>",
          "updatedAt": "<the time when the sub comment was updated>"
        },
        ...
      ]
    },
    ...
  ]
}
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal Server Error"
]
```
---
### GET /posts/user/:id

> Get blog posts by user id

_Request Header_
```
{
  "access_token": "<user's access token>"
}
*tidak wajib, hanya untuk keperluan logging data user
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": <post id>,
    "title": "<post title>",
    "content": "<post content>",
    "UserId": <user's id>,
    "createdAt": "<the time when the post was created>",
    "updatedAt": "<the time when the post was updated>",
    "User": {
      "id": <user's id>,
      "username": "<user's name>",
      "email": "<user's email>",
      "password": "<user's hashed password>",
      "status": "<user's account status>",
      "createdAt": "<the time when the user was created>",
      "updatedAt": "<the time when the user was updated>"
    },
    "Likes": [
      {
        "id": <like id>,
        "PostId": <post id>,
        "UserId": <user's id>,
        "createdAt": "<the time when the like was created>",
        "updatedAt": "<the time when the like was updated>"
      },
      ...
    ],
    "Comments": [
      {
        "id": <comment id>,
        "content": "<user's comment>",
        "PostId": <post id>,
        "UserId": <user's id>,
        "createdAt": "<the time when the comment was created>",
        "updatedAt": "<the time when the comment was updated>",
        "SubComments": [
          {
            "id": <sub comment id>,
            "content": "<user's sub comment>",
            "CommentId": <comment id>,
            "UserId": <user's id>,
            "createdAt": "<the time when the sub comment was created>",
            "updatedAt": "<the time when the sub comment was updated>"
          },
          ...
        ]
      },
      ...
    ]
  },
  ...
]
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal Server Error"
]
```
---
### PUT /posts/:id

> Update a blog post by its id

_Request Header_
```
{
  "access_token": "<user's access token>"
}
```

_Request Body_
```
{
  "title": "<post title>",
  "content": "<post content>"
}
```

_Response (200 - OK)_
```
{
  "id": <post id>,
  "title": "<post title>",
  "content": "<post content>",
  "UserId": <user's id>,
  "createdAt": "<the time when the post was created>",
  "updatedAt": "<the time when the post was updated>"
}
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
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
  "Internal Server Error"
]
```
---
### DELETE /posts/:id

> Delete a blog post by its id

_Request Header_
```
{
  "access_token": "<user's access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Delete Post Success",
  "deleted_post": {
    "id": <post id>,
    "title": "<post title>",
    "content": "<post content>",
    "UserId": <user's id>,
    "createdAt": "<the time when the post was created>",
    "updatedAt": "<the time when the post was updated>"
  }
}
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
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
  "Internal Server Error"
]
```
---
### POST /comments

> Write a comment to a blog post

_Request Header_
```
{
  "access_token": "<user's access token>"
}
```

_Request Body_
```
{
  "content": "<user's comment>",
  "PostId": <post id>
}
```

_Response (201 - Created)_
```
{
  "id": <comment id>,
  "content": "<user's comment>",
  "PostId": "<post id>",
  "UserId": <user's id>,
  "createdAt": "<the time when the like was created>",
  "updatedAt": "<the time when the like was updated>"
}
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
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
  "Internal Server Error"
]
```
---
### DELETE /comments/:id

> Delete a comment by its id

_Request Header_
```
{
  "access_token": "<user's access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Delete Comment Success",
  "deleted_comment": {
    "id": <comment id>,
    "content": "<user's comment>",
    "PostId": "<post id>",
    "UserId": <user's id>,
    "createdAt": "<the time when the like was created>",
    "updatedAt": "<the time when the like was updated>"
  }
}
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
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
  "Internal Server Error"
]
```
---
### POST /sub-comments

> Write a sub comment to a comment in a blog post

_Request Header_
```
{
  "access_token": "<user's access token>"
}
```

_Request Body_
```
{
  "content": "<user's sub comment>",
  "CommentId": <comment id>
}
```

_Response (201 - Created)_
```
{
  "id": <sub comment id>,
  "content": "<user's sub comment>",
  "CommentId": "<comment id>",
  "UserId": <user's id>,
  "createdAt": "<the time when the like was created>",
  "updatedAt": "<the time when the like was updated>"
}
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
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
  "Internal Server Error"
]
```
---
### DELETE /sub-comments/:id

> Delete a comment by its id

_Request Header_
```
{
  "access_token": "<user's access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Delete Sub Comment Success",
  "deleted_sub_comment": {
    "id": <sub comment id>,
    "content": "<user's sub comment>",
    "CommentId": "<comment id>",
    "UserId": <user's id>,
    "createdAt": "<the time when the like was created>",
    "updatedAt": "<the time when the like was updated>"
  }
}
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
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
  "Internal Server Error"
]
```
---
### POST /likes

> Give a like to a blog post

_Request Header_
```
{
  "access_token": "<user's access token>"
}
```

_Request Body_
```
{
  "PostId": <post id>
}
```

_Response (201 - Created)_
```
{
  "id": <like id>,
  "PostId": "<post id>",
  "UserId": <user's id>,
  "createdAt": "<the time when the like was created>",
  "updatedAt": "<the time when the like was updated>"
}
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
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
  "Internal Server Error"
]
```
---
### DELETE /likes/:id

> Delete a like by its id

_Request Header_
```
{
  "access_token": "<user's access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Delete Like Success",
  "deleted_like": {
    "id": <like id>,
    "PostId": "<post id>",
    "UserId": <user's id>,
    "createdAt": "<the time when the like was created>",
    "updatedAt": "<the time when the like was updated>"
  }
}
```

_Response (400 - Bad Request)_
```
[
  "<error message>",
  ...
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated."
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
  "Internal Server Error"
]
```