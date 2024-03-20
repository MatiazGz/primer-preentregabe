class SessionsController {
  register = async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 20,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in!",
          token: req.token,
        });
    } catch (error) {
      return next(error);
    }
  };

  github = async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with github!",
        session: req.session,
      });
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
      return res.json({
        statusCode: 200,
        response: user,
      });
    } catch (error) {
      return next(error);
    }
  };

  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out!",
      });
    } catch (error) {
      return next(error);
    }
  };

  badauth = (req, res, next) => {
    try {
      return res.json({
        statusCode: 401,
        message: " Bad auth",
      });
    } catch (error) {
      return next(error);
    }
  };

  badauthcb = (req, res, next) => {
    try {
      return res.json({
        statusCode: 400,
        message: " Already done",
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default SessionsController;
const controller = new SessionsController();
const { register, login, github, me, signout, badauth, badauthcb } = controller;
export { register, login, github, me, signout, badauth, badauthcb };
