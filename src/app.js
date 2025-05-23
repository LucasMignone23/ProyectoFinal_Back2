import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from './config/passport.js';
import './config/db.js';

import sessionRoutes from './routes/session.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import ticketRoutes from './routes/ticket.routes.js';

import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SIGN));

app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  secret: process.env.COOKIE_SIGN,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/sessions', sessionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/tickets', ticketRoutes);

app.use(errorHandler);

export default app;
