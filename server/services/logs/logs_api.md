# Blog App - Logs Service API
Blog App is an application to manage your blog. It has two services : Users & Logs.

This document explains the Logs services.

The Logs service has :

* RESTful endpoints for CRUD operations of blog access logs.
* JSON formatted response.

&nbsp;

## Endpoints
```
 - POST   /logs
 - GET    /logs
 - DELETE /posts/:id
 - DELETE /logs
```

## RESTful endpoints
### POST /logs

> Create blog access log

_Request Header_
```
not needed
```

_Request Body_
```
{
  "path": "<api path>",
  "user_detail": {user detail object},
  "api_access_time": <api access time in seconds>,
  "request_object": {api request object},
  "response_object": {api response object}
}
```

_Response (201 - Created)_
```
{
  "_id": "<log id>"
  "path": "<api path>",
  "user_detail": {user detail object},
  "api_access_time": <api access time in seconds>,
  "request_object": {api request object},
  "response_object": {api response object},
  "createdAt": "<the time when the log was created>",
  "updatedAt": "<the time when the log was updated>",
  "__v": <version key that represents the path to use for versioning>
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
### GET /logs

> Get all blog access logs

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
[
  {
    "_id": "<log id>"
    "path": "<api path>",
    "user_detail": {user detail object},
    "api_access_time": <api access time in seconds>,
    "request_object": {api request object},
    "response_object": {api response object},
    "createdAt": "<the time when the log was created>",
    "updatedAt": "<the time when the log was updated>",
    "__v": <version key that represents the path to use for versioning>
  },
  ...
]
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
### DELETE /logs/:id

> Delete a blog access log by its id

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
  "message": "Delete Log Success",
  "deleted_log": {
    "_id": "<log id>"
    "path": "<api path>",
    "user_detail": {user detail object},
    "api_access_time": <api access time in seconds>,
    "request_object": {api request object},
    "response_object": {api response object},
    "createdAt": "<the time when the log was created>",
    "updatedAt": "<the time when the log was updated>",
    "__v": <version key that represents the path to use for versioning>
  }
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
### DELETE /logs

> Delete all (reset) blog access logs by its id

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
  "message": "Reset Logs Success"
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