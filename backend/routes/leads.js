// backend/routes/leads.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Criar lead
router.post('/', (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) return res.status(400).json({ erro: 'Dados incompletos' });
  db.run(
    'INSERT INTO leads (nome, email) VALUES (?, ?)',
    [nome, email],
    function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ id: this.lastID, nome, email, criado_em: new Date() });
    }
  );
});

// Listar e buscar
router.get('/', (req, res) => {
  const { search } = req.query;
  let sql = 'SELECT * FROM leads';
  const params = [];
  if (search) {
    sql += ' WHERE nome LIKE ? OR email LIKE ?';
    params.push(`%${search}%`, `%${search}%`);
  }
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// Atualizar
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  db.run(
    'UPDATE leads SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id],
    function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ atualizado: this.changes });
    }
  );
});

// Excluir
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM leads WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ deletado: this.changes });
  });
});

module.exports = router;
