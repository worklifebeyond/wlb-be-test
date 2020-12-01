const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001';
  }

  // handle user features :
  async readUsers(token) {
    return this.get(`/users`, null, {
      headers: {
        access_token: token,
      },
    });
  }
  async registerUser(user) {
    return this.post('/users/register', user);
  }
  async verifyUser(token) {
    return this.get(`/users/verify?token=${token}`);
  }
  async loginUser(user) {
    return this.post('/users/login', user);
  }

  // handle post features :
  async createPost(post, token) {
    return this.post('/posts', post, {
      headers: {
        access_token: token,
      },
    });
  }
  async readPosts(token) {
    return this.get('/posts', null, {
      headers: {
        access_token: token,
      },
    });
  }
  async searchPosts(title, sort, order, token) {
    return this.get(`/posts/search?title=${title}&sort=${sort}&order=${order}`, null, {
      headers: {
        access_token: token,
      },
    });
  }
  async findPostById(id, token) {
    return this.get(`/posts/${id}`, null, {
      headers: {
        access_token: token,
      },
    });
  }
  async findPostsByUserId(id, token) {
    return this.get(`/posts/user/${id}`, null, {
      headers: {
        access_token: token,
      },
    });
  }
  async updatePost(id, post, token) {
    return this.put(`/posts/${id}`, post, {
      headers: {
        access_token: token,
      },
    });
  }
  async deletePost(id, token) {
    return this.delete(`/posts/${id}`, null, {
      headers: {
        access_token: token,
      },
    });
  }

  // handle like-unlike features :
  async createLike(like, token) {
    return this.post('/likes', like, {
      headers: {
        access_token: token,
      },
    });
  }
  async deleteLike(id, token) {
    return this.delete(`/likes/${id}`, null, {
      headers: {
        access_token: token,
      },
    });
  }

  // handle comment features :
  async createComment(comment, token) {
    return this.post('/comments', comment, {
      headers: {
        access_token: token,
      },
    });
  }
  async deleteComment(id, token) {
    return this.delete(`/comments/${id}`, null, {
      headers: {
        access_token: token,
      },
    });
  }

  // handle sub comment features :
  async createSubComment(comment, token) {
    return this.post('/sub-comments', comment, {
      headers: {
        access_token: token,
      },
    });
  }
  async deleteSubComment(id, token) {
    return this.delete(`/sub-comments/${id}`, null, {
      headers: {
        access_token: token,
      },
    });
  }
}

module.exports = UsersAPI;
