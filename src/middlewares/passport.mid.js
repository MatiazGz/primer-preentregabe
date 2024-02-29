import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { users } from "../data/mongo/managger.mongo.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await users.readByField(email);
        if (one) {
          //si el usuario existe, no pueudo registrarlo nuevamente
          return done(null, false);
        } else {
          let data = req.body;
          data.password = createHash(password);
          let user = await users.create(data);
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByField(email);
        if (user && verifyHash(password, user.password)) {
          req.session.email = email;
          req.session.role = user.role;
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  {
    passReqToCallback: true,
    clientID: GOOGLE_ID,
    clienrSecret: GOOGLE_CLIENT,
    callbackURL: "http://localhost:8080/api/sessions/google/callback",
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      let user = await users.readByField(profile.id);
      if (user) {
        req.session.email = profile.id;
        req.session.role = user.role;
        return done(null, user);
      } else {
        user = {
          email: profile.id,
          name: profile.name.givenName,
          lastName: profile.name.familyName,
          photo: profile.coverPhoto,
          password: createHash(profile.id),
        };
        user = await users.create(user);
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  }
);

export default passport;
