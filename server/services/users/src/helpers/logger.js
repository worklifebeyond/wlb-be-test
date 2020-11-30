const { User } = require('../models');
const { verify_jwt_token } = require('./jwt');
const axios = require('axios');

async function log(path, access_token, request_start_time, request_object, response_object) {
  let user_detail;
  if (!access_token) {
    user_detail = {
      name: 'anonymous',
      status: 'unknown',
    };
  } else {
    const decoded_user_data = verify_jwt_token(access_token);
    const { id, username, email, status } = decoded_user_data;
    user_detail = { id, username, email, status };
  }

  try {
    await axios.post('http://localhost:3002/logs', {
      path,
      user_detail,
      api_access_time: Date.now() - request_start_time,
      request_object,
      response_object,
    });
    console.log('logged successfully');
  } catch(err) {
    console.log(err);
  }
}

module.exports = log;
