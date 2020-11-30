const {
  posts,
  search_posts,
  post_by_id,
  posts_by_user_id,
  logs,
} = require('./queries');

const {
  register_user,
  verify_user,
  login_user,
  create_post,
  update_post,
  delete_post,
  create_like,
  delete_like,
  create_comment,
  delete_comment,
  create_sub_comment,
  delete_sub_comment,
  create_log,
  delete_log,
  reset_logs,
} = require('./mutations');

const resolvers = {
  Query: {
   posts,
   search_posts,
   post_by_id,
   posts_by_user_id,
   logs,
  },
  Mutation: {
    register_user,
    verify_user,
    login_user,
    create_post,
    update_post,
    delete_post,
    create_like,
    delete_like,
    create_comment,
    delete_comment,
    create_sub_comment,
    delete_sub_comment,
    create_log,
    delete_log,
    reset_logs,
  },
};

module.exports = resolvers;
