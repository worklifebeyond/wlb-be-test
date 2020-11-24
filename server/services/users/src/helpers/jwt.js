const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_SECRET_KEY;

function generate_jwt_token(userObject) {
  const { id, username, email, status } = userObject;
  return jwt.sign({ id, username, email, status }, secret_key);
}

function verify_jwt_token(token) {
  return jwt.verify(token, secret_key);
}

module.exports = {
  generate_jwt_token,
  verify_jwt_token,
};
