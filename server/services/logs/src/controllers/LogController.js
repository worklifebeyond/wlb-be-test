const Log = require('../models/log');
const errorHandler = require('../helpers/errorHandler');

class LogController {
  static async create(ctx) {
    try {
      const new_log = new Log(ctx.request.body);
      await new_log.save();
      ctx.response.status = 201;
      ctx.response.body = new_log;
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }

  static async read(ctx) {
    try {
      const all_logs = await Log.find({});
      ctx.response.status = 200;
      ctx.response.body = all_logs;
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }

  static async delete(ctx) {
    const id = ctx.request.params.id;
    try {
      const deleted_log = await Log.findByIdAndDelete(id);
      if (!deleted_log) {
        throw new Error('The log does not exist.');
      } else {
        ctx.response.status = 200;
        ctx.response.body = {
          message: 'Delete Log Success',
          deleted_log,
        };
      }
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }

  static async reset(ctx) {
    try {
      const reset_result = await Log.deleteMany({});
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Reset Logs Success',
      };
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
}

module.exports = LogController;
