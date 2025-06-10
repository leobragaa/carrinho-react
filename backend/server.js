import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes    from './routes/authRoutes.js';
import produtoRoutes from './routes/produtosRoutes.js';
import uploadRoutes  from './routes/uploadRoutes.js';

const app = express();
app.use(cors({ origin: 'http://localhost:5176' }));
app.use(express.json());


app.use('/api/auth', authRoutes);


app.use('/api/upload', uploadRoutes);

app.use('/api/produtos', produtoRoutes);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
