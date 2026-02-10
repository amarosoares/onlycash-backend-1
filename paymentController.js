const db = require('../config/db');
const payments = require('../config/payments');

exports.makePayment = (req, res) => {
  const { user_id, creator_id, amount, method } = req.body;
  // Aqui você integraria com APIs reais (Multicaixa / Unitel Money)
  // Por enquanto só registramos a transação no banco
  db.query('INSERT INTO transacoes (usuario_id, criador_id, valor, tipo, status) VALUES (?, ?, ?, ?, ?)',
    [user_id, creator_id, amount, method, 'paid'], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Pagamento registrado com sucesso!' });
    });
};
