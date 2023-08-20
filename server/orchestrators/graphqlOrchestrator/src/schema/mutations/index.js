const mutations = `
  type Mutation {
    register_user(
      username: String
      email: String
      password: String
    ): UserOutputRegister

    verify_user(
      token: String
    ): UserOutputVerify

    login_user(
      email: String
      password: String
    ): UserOutputLogin

    create_post(
      title: String
      content: String
      access_token: String
    ): Post

    update_post(
      id: Int,
      title: String
      content: String
      access_token: String
    ): Post

    delete_post(
      id: Int
      access_token: String
    ): PostOutputDelete

    create_like(
      PostId: Int
      access_token: String
    ): Like

    delete_like(
      id: Int
      access_token: String
    ): LikeOutputDelete

    create_comment(
      content: String
      PostId: Int
      access_token: String
    ): Comment

    delete_comment(
      id: Int
      access_token: String
    ): CommentOutputDelete

    create_sub_comment(
      content: String
      CommentId: Int
      access_token: String
    ): SubComment

    delete_sub_comment(
      id: Int
      access_token: String
    ): SubCommentOutputDelete

    delete_log(
      id: String
    ): LogOutputDelete

    reset_logs: LogOutputReset
  }
`;

module.exports = mutations;
