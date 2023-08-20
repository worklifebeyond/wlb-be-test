function errorHandler(err) {
  const errors = [];
  let status = 400;
  switch(err.name) {
    case 'SequelizeValidationError' :
      err.errors.forEach(error => {
        errors.push(error.message);
      });
      break;
    case 'SequelizeDatabaseError' :
      errors.push(err.message);
      break;
    case 'JsonWebTokenError' :
      errors.push(err.message);
      break;
    case 'TypeError' :
      errors.push(err.message);
      break;
    case 'InternalServerError' :
      errors.push(err.message);
      break;
    case 'Error' :
      errors.push(err.message);
      if (err.message === 'The user is not authenticated.') {
        status = 401;
      }
      if (err.message === 'The user is not authorized.') {
        status = 403;
      }
      break;
    default :
      errors.push('Internal Server Error');
      status = 500;
  }
  return { status, errors };
}

module.exports = errorHandler;
