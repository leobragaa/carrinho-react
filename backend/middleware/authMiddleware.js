import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export const autenticarToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token ausente ou mal formatado.' });
  }
  const token = header.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
    req.usuario = user;
    next();
  });
};
