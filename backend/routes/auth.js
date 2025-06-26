// backend/routes/auth.js
const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario === process.env.ADMIN_USER && senha === process.env.ADMIN_PASS) {
    req.session.autenticado = true;
    return res.json({ ok: true });
  }
  res.status(401).json({ erro: 'Credenciais inválidas' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

module.exports = router;
