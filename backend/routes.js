import { Router } from "express";
import multer from "multer";
import {
  criarProduto,
  lerProdutos,
  atualizarProduto,
  deletarProduto,
} from "../controllers/produtoController.js";
import { autenticarToken } from "../middleware/authMiddleware.js";

const router = Router();

const upload = multer({ dest: "uploads/" });
router.get("/", lerProdutos);

// Middleware de autenticação a partir daqui
router.use(autenticarToken);

// Cria produto com upload de imagem 
router.post("/", upload.single("image"), criarProduto);

// Atualiza produto 
router.put("/:id", upload.single("image"), atualizarProduto);

// Deleta produto
router.delete("/:id", deletarProduto);

export default router;
