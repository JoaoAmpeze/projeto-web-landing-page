// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const leadsRoutes = require('./routes/leads');

const app = express();

// Permitir requests do front (Vite rodando em 5173)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Sessão para autenticação
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Rotas públicas de login/logout
app.use('/api/auth', authRoutes);

// Middleware que protege as rotas de leads
app.use('/api/leads', (req, res, next) => {
  if (!req.session.autenticado) {
    return res.status(401).json({ erro: 'Não autenticado' });
  }
  next();
}, leadsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
