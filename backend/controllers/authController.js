import { prisma } from '../prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const registrar = async (req, res) => {
  const { nome, email, senha, cep, rua, numero, tipo } = req.body;
  if (!nome || !email || !senha || !cep || !rua || !numero || !tipo) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }
  try {
    if (await prisma.usuario.findUnique({ where: { email } })) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }
    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = await prisma.usuario.create({
      data: {
        nome, email, senha: senhaHash,
        endereco: { create: { cep, rua, numero, tipo } }
      },
      include: { endereco: true }
    });
    const { senha: _, ...u } = usuario;
    res.status(201).json({ message: 'Usuário registrado com sucesso!', usuario: u });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }
  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    if (!(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '2h' });
    const { senha: _, ...u } = usuario;
    res.json({ message: 'Login realizado com sucesso!', token, usuario: u });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno ao realizar login.' });
  }
};
