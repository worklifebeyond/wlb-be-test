function errorHandler(err) {
  const errors = [];
  let status;
  console.log(err.name);
  console.log(err.message);
  switch(err.name) {
    case 'SequelizeValidationError' :
      err.errors.forEach(error => {
        errors.push(error.message);
      });
      status = 400;
      break;
    case 'InternalServerError' :
      errors.push(err.message);
      status = 400;
      break;
    default :
      errors.push('Internal Server Error');
      status = 500;
  }
  return { status, errors };
}

module.exports = errorHandler;
