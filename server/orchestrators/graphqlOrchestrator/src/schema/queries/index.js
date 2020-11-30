const queries = `
  type Query {
    posts: [Post]

    search_posts(
      title: String
      sort: String
      order: String
    ): PostOutputSearch

    post_by_id(
      id: Int
    ): Post

    posts_by_user_id(
      id: Int
    ): [Post]

    logs: [Log]
  }
`;

module.exports = queries;
