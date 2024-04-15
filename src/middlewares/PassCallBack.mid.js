import passport from "passport";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

export default (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      console.log({ error, user, info });
      if (error) {
        return next(error);
      }
      if (!user) {
        CustomError.new(errors.callbackPass(info.message || info.toString(), info.statusCode || 401))
        // return res.json({
        //   statusCode: info.statusCode || 401,
        //   message: info.messages || info.toString(),
        // });
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};
