const express = require('express');
const router = express.Router();

const { findUser, updateUser } = require('../../utils/users');

router.post('/', async (req, res) => {

    if (!req.session || !req.session.user || !req.session.user.isAdmin) {
        return res.status(403).json({
            status: false,
            creator: 'Sakura',
            error: 'Solo administradores pueden hacer esto'
        });
    }

    const { username, isAdmin } = req.body;

    if (!username || typeof isAdmin !== 'boolean') {
        return res.status(400).json({
            status: false,
            creator: 'Sakura',
            error: 'Faltan username o isAdmin (true/false)'
        });
    }

    const target = await findUser(username);

    if (!target) {
        return res.status(404).json({
            status: false,
            creator: 'Sakura',
            error: 'Ese usuario no existe'
        });
    }

    const updated = await updateUser(target.username, { is_admin: isAdmin });

    res.json({
        status: true,
        creator: 'Sakura',
        username: updated.username,
        isAdmin: updated.is_admin
    });

});

module.exports = router;
