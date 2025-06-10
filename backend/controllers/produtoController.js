import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;
    // usa req.file se vier upload, senão usa campo no body
    const imagem = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imagem;

    const produto = await prisma.produto.create({
      data: { nome, descricao, preco: Number(preco), imagem },
    });
    return res.status(201).json(produto);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

export const lerProdutos = async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany();
    return res.json(produtos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

export const buscarProdutoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await prisma.produto.findUnique({ where: { id: Number(id) } });
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    return res.json(produto);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

export const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;
    const imagem = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imagem;

    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: { nome, descricao, preco: Number(preco), imagem },
    });
    return res.json(produto);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.produto.delete({ where: { id: Number(id) } });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};
