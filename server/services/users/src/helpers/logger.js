const { User } = require('../models');
const { verify_jwt_token } = require('./jwt');
const axios = require('axios');

async function log(path, user_object, access_token, request_start_time, request_object, response_object) {
  const api_access_time = Date.now() - request_start_time;
  let user_detail;

  if (access_token === 'null' || access_token === '') {
    access_token = null;
  }

  if (user_object) {
    const user = await User.findOne({ where: user_object });
    user_detail = user;
  } else if (access_token) {
    const decoded_user_data = verify_jwt_token(access_token); console.log('hasilnya gimana guyssss =====', decoded_user_data);
    const { id, username, email, status } = decoded_user_data;
    const user = await User.findOne({ where: { id, username, email, status }});
    user_detail = user;
  } else {
    user_detail = {
      id: null,
      username: null,
      email: null,
      password: null,
      status: null,
      createdAt: null,
      updatedAt: null,
    };
  }

  try {
    await axios.post(process.env.LOGS_URL, {
      path,
      user_detail,
      api_access_time,
      request_object,
      response_object,
    });
    console.log('logged successfully');
  } catch(err) {
    console.log(err);
  }
}

module.exports = log;
