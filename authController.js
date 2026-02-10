const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { name, email, password, type } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.query('INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, type], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Usuário registrado com sucesso!' });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    const user = results[0];
    const valid = bcrypt.compareSync(password, user.senha);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta' });
    const token = jwt.sign({ id: user.id, type: user.tipo }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  });
};
