const bcrypt = require('bcryptjs');

function generate_bcrypt_hash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function compare_bcrypt_password(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  generate_bcrypt_hash,
  compare_bcrypt_password,
};
