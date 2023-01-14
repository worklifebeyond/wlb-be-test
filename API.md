Delvia's Blog

- Register
- Login
- Create Post
- Edit Post
- Delete Post
- Fetch Posts
- Like the Post
- Comment the Post
- Search by Title

### POST / register

> Create a new user account
> _Request Header_

```
no need
```

_Request Body_

```
{
    username : <input username>
    email    : <input email>
    password : <input password>
}
```

_Response (201)_

```
{
    "msg" : "success"
}

Link verification will be send to email
_Verification Process_

```

    Click the link that has been send.

```

_Response (200)_

```

    Verification Success

```

_Response (400)_

```

    Link Invalid

```

```

_Response (400)_

```
    "msg": "bad request"
```

### POST / login

> Login for Existing User
> _Request Header_

```
    no need
```

_Request Body_

```
    {
        email       : <input email>
        password    : <input password>
    }
```

_Response (200)_

```
    "msg": "you are successfully login"
    token: <token>
```

_Response (400)_

```
    "msg": "Email not found / not verified"
```

_Response (400)_

```
    "msg": "Invalid email/password"
```

### POST / post

> Create post

_Request Header_

```
    token: <token>
```

_Request Body_

```
    title       : <input title>
    description : <input description>
```

_Response (201)_

```

    "msg": "success",
    "data": {
        "id": 1,
        "title": "Android",
        "description": "How to choose the right phone?",
        "UserId": 1,
        "updatedAt": "2021-01-11T02:46:02.445Z",
        "createdAt": "2021-01-11T02:46:02.445Z"
    }

```

_Response (400)_

```
    "msg": "please input the title / description"
```

### PUT / post / :id

> Edit existing post

_Request Header_

```
    token: <token>
```

_Request Body_

```
    title       : <input title>
    or / both
    Description : <input description>
```

_Response (201)_

```
    "msg": "updated success",
    "updatePost": [
        1
    ]
```

_Response (400)_

```
    "msg": "please login first"
```

_Response (404)_

```
    "msg": "post not found"
```

### DELETE / post / :id

> Delete Post

_Request Header_

```
    token: <token>
```

_Request Body_

```
    no need
```

_Response (400)_

```
    "msg": "please login first"
```

_Response (404)_

```
    "msg": "post not found"
```

### GET / post

> Fetch all posts

_Request Header_

```
    token: <token>
```

_Request Body_

```
    no need
```

_Response (200)_

```
    "msg": "success",
    "data": [
        {
            "id": 2,
            "title": "Iphone",
            "description": "Is your iPhone eavesdropping you ?",
            "UserId": 1,
            "createdAt": "2021-01-11T03:03:41.033Z",
            "updatedAt": "2021-01-11T03:03:41.033Z",
            "Likes": [],
            "Comments": [],
            "Subcomments": []
        },
        {
            "id": 3,
            "title": "Android",
            "description": "Compare the latest android version from last year.",
            "UserId": 1,
            "createdAt": "2021-01-11T03:07:03.540Z",
            "updatedAt": "2021-01-11T03:07:03.540Z",
            "Likes": [],
            "Comments": [],
            "Subcomments": []
        }
    ]
```

_Response (400)_

```
    "msg": "please login first"
```

### POST / :id / like

> Like a Post

_Request Header_

```
    token: <token>
```

_Request Body_

```
    no need
```

_Response (200)_

```
    "msg": "You liked this post!",
    "data": {
        "id": 1,
        "UserId": 1,
        "PostId": 2,
        "updatedAt": "2021-01-11T03:18:23.492Z",
        "createdAt": "2021-01-11T03:18:23.492Z"
    }

    Notification send to email
```

_Response (400)_

```
    "msg": "please login first"
```

_Response (404)_

```
    "msg": "post not found"
```

### POST / :id / comment

> Like a Post

_Request Header_

```
    token: <token>
```

_Request Body_

```
    "content": "this article isn't legit"
```

_Response (200)_

```
   "msg": "Comment Posted",
    "data": {
        "id": 1,
        "content": "this article isn't legit",
        "UserId": 1,
        "PostId": 2,
        "updatedAt": "2021-01-11T03:19:56.596Z",
        "createdAt": "2021-01-11T03:19:56.596Z"
    }

    Notification send to email
```

_Response (400)_

```
    "msg": "please login first"
```

_Response (404)_

```
    "msg": "post not found"
```

### GET / post / :title

> Fetch post by Title

_Request Header_

```
    token: <token>
```

_Request Body_

```
    no need
```

_Response (200)_

```
    "msg": "success",
    "data": [
        {
            "id": 2,
            "title": "Iphone",
            "description": "Is your iPhone eavesdropping you ?",
            "UserId": 1,
            "createdAt": "2021-01-11T03:03:41.033Z",
            "updatedAt": "2021-01-11T03:03:41.033Z",
            "Likes": [
                {
                    "id": 1,
                    "PostId": 2,
                    "UserId": 1,
                    "createdAt": "2021-01-11T03:18:23.492Z",
                    "updatedAt": "2021-01-11T03:18:23.492Z"
                }
            ],
            "Comments": [
                {
                    "id": 1,
                    "content": "this article isn't legit",
                    "PostId": 2,
                    "createdAt": "2021-01-11T03:19:56.596Z",
                    "updatedAt": "2021-01-11T03:19:56.596Z",
                    "UserId": 1
                }
            ]
        },
        {
            "id": 4,
            "title": "Iphone",
            "description": "is iPhone worth it ?",
            "UserId": 1,
            "createdAt": "2021-01-11T03:22:45.821Z",
            "updatedAt": "2021-01-11T03:22:45.821Z",
            "Likes": [],
            "Comments": []
        }
    ]
```

_Response (400)_

```
    "msg": "please login first"
```

### POST / comment / :id / subcomment

> Create SubComment

_Request Header_

```
token: <token>
```

_Request Body_

```
    "content": <input content>
    "CommentId": <input comment id>
```

_Response (201)_

```
    "msg": "success",
    "data": {
        "id": 3,
        "content": "love this comment!",
        "CommentId": 1,
        "UserId": 1,
        "PostId": 1,
        "updatedAt": "2021-01-11T14:58:24.651Z",
        "createdAt": "2021-01-11T14:58:24.651Z"
    }

    notification send to email
```

_Response (400)_

```
    "msg": "please login first"
```

_Response (404)_

```
    "msg": "post not found"
```
