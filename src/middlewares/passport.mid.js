import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
//import { Strategy as GoogleStrategy} from "passport-google-oauth2"
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { users } from "../data/mongo/managger.mongo.js";
import { createToken } from "../utils/token.utils.js";
const { GOOGLE_ID, GOOGLE_CLIENT, GITHUB_ID, GITHUB_CLIENT, SECRET } =
  process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await users.readByField(email);
        if (!one) {
          let data = req.body;
          data.password = createHash(password);
          let user = await users.create(data);
          return done(null, user);
        } else {
          return done(null, false, {
            messages: "Already exists",
            statusCode: 400,
          });
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
          const token = createToken({ email, role: user.role });
          req.token = token;
          return done(null, user);
        } else {
          return done(null, false, { messages: "Bad auth" });
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
//       let user = await users.readByField(profile.id);
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
//         user = await users.create(user);
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
        let user = await users.readByField(profile.id + "@github.com");
        if (!user) {
          user = {
            email: profile.id + "@github.com",
            name: profile.username,
            photo: profile._json.avatar_url,
            password: createHash(profile.id),
          };
          user = await users.create(user);
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
          user.password = null;
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
export default passport;