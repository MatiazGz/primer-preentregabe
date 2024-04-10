import service from "../services/users.service.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

class SessionsController {
  register = async (req, res, next) => {
    const { email, name } = req.body;
    const { verifiedCode } = req.user;
    await this.service.register({ email, name, verifiedCode });
    try {
      return res.success201("Registered!");
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .success200("Loged in!");
    } catch (error) {
      return next(error);
    }
  };

  github = async (req, res, next) => {
    try {
      return res.success200("Logged in with Github!");
    } catch (error) {
      return next(error);
    }
  };

  me = async (req, res, next) => {
    try {
      const user = {
        email: req.user.email,
        role: req.user.role,
        photo: req.user.photo,
      };
      return res.success200(user);
    } catch (error) {
      return next(error);
    }
  };

  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").success200("Signed out!");
    } catch (error) {
      return next(error);
    }
  };

  badauth = (req, res, next) => {
    try {
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };

  verifyAccount = async (req, res, next) => {
    try {
      const { verifiedCode, email } = req.body;
      const user = await service.readByField(email);
      if (user.verifiedCode === verifiedCode) {
        await service.update(user._id, { verified: true });
        return res.success200("verified user!");
      } else {
        CustomError.new(errors.token);
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default SessionsController;
const controller = new SessionsController();
const { register, login, github, me, signout, badauth, verifyAccount } =
  controller;
export { register, login, github, me, signout, badauth, verifyAccount };
