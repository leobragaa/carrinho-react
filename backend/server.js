const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Serve arquivos estáticos da pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração do multer para salvar imagens localmente
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Rota de teste
app.get('/', (req, res) => {
  res.send('API Prisma funcionando!');
});

// Rota para upload de imagem
app.post('/upload', upload.single('imagem'), (req, res) => {
  const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Listar todos os produtos
app.get('/produtos', async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

// Criar um novo produto
app.post('/produtos', async (req, res) => {
  const { nome, preco, descricao, imagemUrl } = req.body;
  const produto = await prisma.produto.create({
    data: { nome, preco: parseFloat(preco), descricao, imagemUrl }
  });
  res.json(produto);
});

// Atualizar um produto
app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco, descricao, imagemUrl } = req.body;
  const produto = await prisma.produto.update({
    where: { id: parseInt(id) },
    data: { nome, preco: parseFloat(preco), descricao, imagemUrl }
  });
  res.json(produto);
});

// Deletar um produto
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.produto.delete({
    where: { id: parseInt(id) }
  });
  res.json({ message: 'Produto deletado com sucesso' });
});

// Porta do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
