const express = require('express');
const router = express.Router();

const { findUser } = require('../../utils/users');

router.get('/', async (req, res) => {

    if (!req.session || !req.session.user) {
        return res.status(401).json({
            status: false,
            creator: 'Sakura',
            error: 'No has iniciado sesión'
        });
    }

    const user = await findUser(req.session.user.username);

    if (!user) {
        return res.status(404).json({
            status: false,
            creator: 'Sakura',
            error: 'Usuario no encontrado'
        });
    }

    res.json({
        status: true,
        creator: 'Sakura',
        username: user.username,
        apiKey: user.api_key,
        avatarUrl: user.avatar_url,
        requestsUsed: user.requests_used,
        requestsLimit: user.unlimited ? null : user.requests_limit,
        unlimited: !!user.unlimited
    });

});

module.exports = router;
