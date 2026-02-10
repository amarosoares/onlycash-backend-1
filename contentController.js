const db = require('../config/db');

exports.uploadContent = (req, res) => {
  const { creator_id, type, title, price } = req.body;
  db.query('INSERT INTO conteudos (criador_id, tipo, titulo, preco) VALUES (?, ?, ?, ?)',
    [creator_id, type, title, price], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Conteúdo publicado com sucesso!' });
    });
};

exports.getContents = (req, res) => {
  db.query('SELECT * FROM conteudos', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
