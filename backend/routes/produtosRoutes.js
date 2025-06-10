import { Router } from 'express';
import {
  criarProduto,
  lerProdutos,
  atualizarProduto,
  deletarProduto
} from '../controllers/produtoController.js';
import { autenticarToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(autenticarToken);

router.post('/', criarProduto);         
router.get('/', lerProdutos);           
router.put('/:id', atualizarProduto);   
router.delete('/:id', deletarProduto);  

export default router;
