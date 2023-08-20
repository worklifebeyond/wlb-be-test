function errorHandler(err) {
  const errors = [];
  let status = 400;
  switch(err.name) {
    case 'ValidationError' :
      err.message.split(', ').forEach(msg => {
        const temp = msg.split(': ');
        errors.push(temp[temp.length - 1]);
      });
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
