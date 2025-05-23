import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserRepository from '../dao/repositories/user.repository.js';
import UserDTO from '../dao/dto/user.dto.js';
dotenv.config();
const userRepo = new UserRepository();
passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await userRepo.getByEmail(email);
    if (!user) return done(null, false);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return done(null, false);
    return done(null, user);
  } catch (err) { return done(err); }
}));
passport.use('current', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([req => req && req.cookies ? req.cookies.jwt : null]),
  secretOrKey: process.env.JWT_PRIVATE_KEY
}, async (payload, done) => {
  try {
    const user = await userRepo.getById(payload.id);
    if (!user) return done(null, false);
    return done(null, new UserDTO(user));
  } catch (err) { return done(err); }
}));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try { const user = await userRepo.getById(id); done(null, user); }
  catch (err) { done(err); }
});
export default passport;
