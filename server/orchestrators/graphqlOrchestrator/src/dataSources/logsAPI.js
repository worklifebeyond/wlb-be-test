const { RESTDataSource } = require('apollo-datasource-rest');

class LogsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3002';
  }

  async createLog(log) {
    return this.post('/logs', log);
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
