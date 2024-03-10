import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
import sesionsRouter from "../views/sessions.view.js";
import passCallBack from "../../middlewares/PassCallBack.mid.js";
import CustomRouter from "../CustomRouter.js";

export default class SessionsRouter extends CustomRouter {
  init() {
    //register
    this.create(
      "/register",
      has8char,
      passCallBack("register"),
      async (req, res, next) => {
        try {
          return res.json({
            statusCode: 201,
            message: "Registered!",
          });
        } catch (error) {
          return next(error);
        }
      }
    );

    //login

    this.create("/login", passCallBack("login"), async (req, res, next) => {
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
    });

    //github-callback
    this.read(
      "/github/callback",
      passport.authenticate("github", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      async (req, res, next) => {
        try {
          return res.json({
            statusCode: 200,
            message: "Logged in with github!",
            session: req.session,
          });
        } catch (error) {
          return next(error);
        }
      }
    );

    //me
    this.create("/", passCallBack("jwt"), async (req, res, next) => {
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
    });
    //singout
    this.create("/signout", passCallBack("jwt"), async (req, res, next) => {
      try {
        return res.clearCookie("token").json({
          statusCode: 200,
          message: "Signed out!",
        });
      } catch (error) {
        return next(error);
      }
    });

    //badauth
    this.read("/badauth", (req, res, next) => {
      try {
        return res.json({
          statusCode: 401,
          message: " Bad auth",
        });
      } catch (error) {
        return next(error);
      }
    });
    //signout/cb
    this.read("/signout/cb", (req, res, next) => {
      try {
        return res.json({
          statusCode: 400,
          message: " Already done",
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}
