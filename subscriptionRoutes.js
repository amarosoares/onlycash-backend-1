const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/subscribe', (req, res) => {
  const { user_id, creator_id, start_date, end_date, value } = req.body;
  db.query('INSERT INTO assinaturas (usuario_id, criador_id, inicio, fim, valor) VALUES (?, ?, ?, ?, ?)',
    [user_id, creator_id, start_date, end_date, value], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Assinatura criada com sucesso!' });
    });
});

module.exports = router;
