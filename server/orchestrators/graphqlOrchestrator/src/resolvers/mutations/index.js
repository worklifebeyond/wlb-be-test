const Redis = require('ioredis');
const redis = new Redis();

// handle user mutations :
async function register_user(_, user, { dataSources }) {
  return dataSources.usersAPI.registerUser(user);
}
async function verify_user(_, { token }, { dataSources }) {
  return dataSources.usersAPI.verifyUser(token);
}
async function login_user(_, user, { dataSources }) {
  return dataSources.usersAPI.loginUser(user);
}

// handle post mutations :
async function create_post(_, { title, content, access_token }, { dataSources }) {
  await redis.del('users', 'posts');
  return dataSources.usersAPI.createPost({ title, content }, access_token);
}
async function update_post(_, { id, title, content, access_token }, { dataSources }) {
  await redis.del('users', 'posts');
  return dataSources.usersAPI.updatePost(id, { title, content }, access_token);
}
async function delete_post(_, { id, access_token }, { dataSources }) {
  await redis.del('users', 'posts');
  return dataSources.usersAPI.deletePost(id, access_token);
}

// handle like-unlike mutations :
async function create_like(_, { PostId, access_token }, { dataSources }) {
  await redis.del('users', 'posts');
  return dataSources.usersAPI.createLike({ PostId }, access_token);
}
async function delete_like(_, { id, access_token }, { dataSources }) {
  await redis.del('users', 'posts');
  return dataSources.usersAPI.deleteLike(id, access_token);
}

// handle comment mutations :
async function create_comment(_, { content, PostId, access_token }, { dataSources }) {
  await redis.del('users', 'posts');
  return dataSources.usersAPI.createComment({ content, PostId }, access_token);
}
async function delete_comment(_, { id, access_token }, { dataSources }) {
  await redis.del('users', 'posts');
  return dataSources.usersAPI.deleteComment(id, access_token);
}

// handle sub comment mutations :
async function create_sub_comment(_, { content, CommentId, access_token }, { dataSources }) {
  await redis.del('users', 'posts');
  return dataSources.usersAPI.createSubComment({ content, CommentId }, access_token);
}
async function delete_sub_comment(_, { id, access_token }, { dataSources }) {
  await redis.del('users', 'posts');
  return dataSources.usersAPI.deleteSubComment(id, access_token);
}

// handle log mutations :
async function delete_log(_, { id }, { dataSources }) {
  return dataSources.logsAPI.deleteLog(id);
}
async function reset_logs(_, __, { dataSources }) {
  return dataSources.logsAPI.resetLogs();
}

module.exports = {
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
  delete_log,
  reset_logs,
};
