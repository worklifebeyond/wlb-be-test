const models = `
  type User {
    id: ID
    username: String
    email: String
    password: String
    status: String
    createdAt: String
    updatedAt: String
  }

  type UserOutputRegister {
    message: String
    verification_token: String
    data: User
  }

  type UserOutputVerify {
    message: String
    data: User
  }

  type UserOutputLogin {
    message: String
    access_token: String
    user_id: Int
  }

  type Post {
    id: ID
    title: String
    content: String
    UserId: Int
    createdAt: String
    updatedAt: String
    User: User
    Likes: [Like]
    Comments: [Comment]
  }

  type PostOutputSearch {
    count: Int
    data: [Post]
  }

  type PostOutputDelete {
    message: String
    deleted_post: Post
  }

  type Like {
    id: ID
    PostId: Int
    UserId: Int
    createdAt: String
    updatedAt: String
  }

  type LikeOutputDelete {
    message: String
    deleted_like: Like
  }

  type Comment {
    id: ID
    content: String
    PostId: Int
    UserId: Int
    createdAt: String
    updatedAt: String
    SubComments: [SubComment]
  }

  type CommentOutputDelete {
    message: String
    deleted_comment: Comment
  }

  type SubComment {
    id: ID
    content: String
    CommentId: Int
    UserId: Int
    createdAt: String
    updatedAt: String
  }

  type SubCommentOutputDelete {
    message: String
    deleted_sub_comment: SubComment
  }

  type Log {
    _id: ID
    path: String
    user_detail: UserDetail
    api_access_time: Float
    request_object: RequestObject
    response_object: ResponseObject
    createdAt: String
    updatedAt: String
  }

  type UserDetail {
    username: String
    email: String
    status: String
  }

  type RequestObject {
    method: String
  }

  type ResponseObject {
    status_code: Int
  }

  type LogOutputDelete {
    message: String
    deleted_log: Log
  }

  type LogOutputReset {
    message: String
  }
`;

module.exports = models;
