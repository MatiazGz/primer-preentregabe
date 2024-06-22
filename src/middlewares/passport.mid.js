import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
//import { Strategy as GoogleStrategy} from "passport-google-oauth2"
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { createToken } from "../utils/token.utils.js";
import repository from "../repositories/user.rep.js";
import errors from "../utils/errors/errors.js";
import crypto from "crypto";
import users from "../data/mongo/users.mongo.js";

const { GOOGLE_ID, GOOGLE_CLIENT, GITHUB_ID, GITHUB_CLIENT, SECRET } =
  process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const one = await repository.readByField(email);
        if (!one) {
          let data = req.body;
          const verifiedCode = crypto.randomBytes(12).toString("hex");
          data.verifiedCode = verifiedCode;
          let user = await repository.create(data);
          return done(null, user);
        } else {
          return done(null, false, errors.register);
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
        const user = await repository.readByField(email);
        const verify = verifyHash(password, user.password);
        if (user?.verified && verify) {
          req.token = createToken({ email, role: user.role });
          return done(null, user);
        } else {
          return done(null, false, errors.auth);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
// passport.use(
//   {
//     passReqToCallback: true,
//     clientID: GOOGLE_ID,
//     clienrSecret: GOOGLE_CLIENT,
//     callbackURL: "http://localhost:8080/api/sessions/google/callback",
//   },
//   async (req, accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await repository.readByField(profile.id);
//       if (user) {
//         req.session.email = profile.id;
//         req.session.role = user.role;
//         return done(null, user);
//       } else {
//         user = {
//           email: profile.id,
//           name: profile.name.givenName,
//           lastName: profile.name.familyName,
//           photo: profile.coverPhoto,
//           password: createHash(profile.id),
//         };
//         user = await repository.create(user);
//         req.session.email = user.email;
//         req.session.role = user.role;
//         return done(null, user);
//       }
//     } catch (error) {
//       return done(error);
//     }
//   }
// );
passport.use(
  "github",
  new GithubStrategy(
    {
      passReqToCallback: true,
      clientID: GITHUB_ID,
      clientSecret: GITHUB_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/github/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await repository.readByField(profile.id + "@github.com");
        if (!user) {
          user = {
            email: profile.id + "@github.com",
            name: profile.username,
            photo: profile._json.avatar_url,
            password: createHash(profile.id),
          };
          user = await repository.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: SECRET,
    },
    async (payload, done) => {
      try {
        const user = await users.readByField(payload.email);
        if (user) {
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
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email", passwordField: "code" },
    async (req, email, code, done) => {
      try {
        const user = await repository.readByField(email);
        if (user && user.verifiedCode === code) {
          await repository.update(user._id, { verified: true });
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect verification code" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
export default passport;
