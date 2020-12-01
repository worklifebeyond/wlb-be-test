const Redis = require('ioredis');
const redis = new Redis();

// handle post features :
async function posts(_, { access_token }, { dataSources }) {
  const cached_posts = await redis.get('posts');
  if (cached_posts) {
    return JSON.parse(cached_posts);
  } else {
    const posts = await dataSources.usersAPI.readPosts(access_token);
    await redis.set('posts', JSON.stringify(posts));
    return posts;
  }
}
async function search_posts(_, { title, sort, order, access_token }, { dataSources }) {
  return dataSources.usersAPI.searchPosts(title, sort, order, access_token);
}
async function post_by_id(_, { id, access_token }, { dataSources }) {
  return dataSources.usersAPI.findPostById(id, access_token);
}
async function posts_by_user_id(_, { id, access_token }, { dataSources }) {
  return dataSources.usersAPI.findPostsByUserId(id, access_token);
}

// handle log feature :
async function logs(_, __, { dataSources }) {
  return dataSources.logsAPI.readLogs();
}

module.exports = {
  posts,
  search_posts,
  post_by_id,
  posts_by_user_id,
  logs,
};
