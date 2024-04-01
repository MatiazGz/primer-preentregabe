import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/PassCallBack.mid.js";
import CustomRouter from "../CustomRouter.js";
import {
  register,
  login,
  github,
  me,
  signout,
  badauth,
  badauthcb,
  verifyAccount,
} from "../../controllers/sessions.controller.js";

export default class SessionsRouter extends CustomRouter {
  init() {
    //register
    this.create("/register", ["PUBLIC"], has8char, passCallBack("register"), register );
    //login
    this.create("/login", ["PUBLIC"], passCallBack("login"), login);
    // github
    this.create("/github", ["PUBLIC"], passport.authenticate("github", { scope: ["email", "profile"] }));
    this.read("/github/callback", ["PUBLIC"], passport.authenticate("github", { session: false, failureRedirect: "/api/sessions/badauth"}), github);
    //me
    this.create("/", ["PUBLIC"], passCallBack("jwt"), me);
    //singout
    this.create("/signout", ["PUBLIC"], passCallBack("jwt"), signout);
    //badauth
    this.read("/badauth", ["PUBLIC"], badauth);
    //signout/cb
    this.read("/signout/cb", ["PUBLIC"], badauthcb);
    //verify
    this.create("/verified", ["PUBLIC"], verifyAccount);
  }
}
