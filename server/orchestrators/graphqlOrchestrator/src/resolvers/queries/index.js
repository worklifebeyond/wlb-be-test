const Redis = require('ioredis');
const redis = new Redis();

// handle post features :
async function posts(_, __, { dataSources }) {
  const cached_posts = await redis.get('posts');
  if (cached_posts) {
    return JSON.parse(cached_posts);
  } else {
    const posts = await dataSources.usersAPI.readPosts();
    await redis.set('posts', JSON.stringify(posts));
    return posts;
  }
}
async function search_posts(_, { title, sort, order }, { dataSources }) {
  return dataSources.usersAPI.searchPosts(title, sort, order);
}
async function post_by_id(_, { id }, { dataSources }) {
  return dataSources.usersAPI.findPostById(id);
}
async function posts_by_user_id(_, { id }, { dataSources }) {
  return dataSources.usersAPI.findPostsByUserId(id);
}

// handle log feature :
async function logs(_, __, { dataSources }) {
  const cached_logs = await redis.get('logs');
  if (cached_logs) {
    return JSON.parse(cached_logs);
  } else {
    const logs = await dataSources.logsAPI.readLogs();
    await redis.set('logs', JSON.stringify(logs));
    return logs;
  }
}

module.exports = {
  posts,
  search_posts,
  post_by_id,
  posts_by_user_id,
  logs,
};
