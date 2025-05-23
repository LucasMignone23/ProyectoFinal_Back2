import UserRepository from '../dao/repositories/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    // Verificar si ya existe el usuario
    if (await new UserRepository().getByEmail(email)) {
      return res.status(400).json({ error: 'exist' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await new UserRepository().create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword
    });

    res.status(201).json({ id: user._id });
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await new UserRepository().getByEmail(email);

    // Validar credenciales
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'cred' });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Enviar cookie con el token
    res
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3600000
      })
      .json({ message: 'ok' });
  } catch (e) {
    next(e);
  }
};

export const current = (req, res) => {
  // Devuelve el usuario ya autenticado por Passport
  res.json({ user: req.user });
};
