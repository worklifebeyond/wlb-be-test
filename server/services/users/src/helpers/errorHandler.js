function errorHandler(err) {
  const errors = [];
  let status = 400;
  console.log(err.name);
  console.log(err.message);
  switch(err.name) {
    case 'SequelizeValidationError' :
      err.errors.forEach(error => {
        errors.push(error.message);
      });
      break;
    case 'InternalServerError' :
      errors.push(err.message);
      break;
    case 'Error' :
      errors.push(err.message);
      break;
    default :
      errors.push('Internal Server Error');
      status = 500;
  }
  return { status, errors };
}

module.exports = errorHandler;
