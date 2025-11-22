const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        return res.status(200).json({ mensagem: 'Logout realizado com sucesso.' });
    });
});

module.exports = router;
