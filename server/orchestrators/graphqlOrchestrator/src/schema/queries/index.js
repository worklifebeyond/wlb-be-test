const queries = `
  type Query {
    users(
      access_token: String
    ): [User]
    
    posts(
      access_token: String
    ): [Post]

    search_posts(
      title: String
      sort: String
      order: String
      access_token: String
    ): PostOutputSearch

    post_by_id(
      id: Int
      access_token: String
    ): Post

    posts_by_user_id(
      id: Int
      access_token: String
    ): [Post]

    logs: [Log]
  }
`;

module.exports = queries;
