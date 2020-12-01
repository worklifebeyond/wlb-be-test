const { RESTDataSource } = require('apollo-datasource-rest');
const env = process.env.NODE_ENV || 'development';

class LogsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = this.chooseBaseURL(env);
  }

  chooseBaseURL(env) {
    if (env === 'production') {
      return 'https://blog-users-api-alftirta.herokuapp.com';
    } else {
      return 'http://localhost:3002';
    }
  }
  
  async readLogs() {
    return this.get('/logs');
  }
  async deleteLog(id) {
    return this.delete(`/logs/${id}`);
  }
  async resetLogs() {
    return this.delete('/logs');
  }
}

module.exports = LogsAPI;
