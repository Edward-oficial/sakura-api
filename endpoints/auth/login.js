const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const { findUser, updateUser } = require('../../utils/users');
const verifyCaptcha = require('../../utils/verifyCaptcha');
const generateApiKey = require('../../utils/apiKey');

const REQUESTS_LIMIT = 1000;
const RESET_DAYS = 30;

router.post('/', async (req, res) => {

    try {

        const { username, password, captchaToken } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                status: false,
                creator: 'Sakura',
                error: 'Faltan username o password'
            });
        }

        const captchaOk = await verifyCaptcha(captchaToken);

        if (!captchaOk) {
            return res.status(400).json({
                status: false,
                creator: 'Sakura',
                error: 'Captcha inválido'
            });
        }

        let user = await findUser(username);

        if (!user) {
            return res.status(401).json({
                status: false,
                creator: 'Sakura',
                error: 'Usuario o contraseña incorrectos'
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                status: false,
                creator: 'Sakura',
                error: 'Usuario o contraseña incorrectos'
            });
        }

        // Auto-migración: si esta cuenta se creó antes de tener API keys, se la asignamos ahora
        if (!user.api_key) {
            const apiKey = await generateApiKey();

            user = await updateUser(user.username, {
                api_key: apiKey,
                requests_used: user.requests_used || 0,
                requests_limit: user.requests_limit || REQUESTS_LIMIT,
                reset_at:
                    user.reset_at ||
                    new Date(Date.now() + RESET_DAYS * 24 * 60 * 60 * 1000).toISOString()
            });
        }

        // La sesión es lo que da acceso a las páginas (login forzoso)
        req.session.user = {
            username: user.username,
            apiKey: user.api_key,
            avatarUrl: user.avatar_url
        };

        res.json({
            status: true,
            creator: 'Sakura',
            apiKey: user.api_key,
            requestsUsed: user.requests_used || 0,
            requestsLimit: user.unlimited ? null : (user.requests_limit || REQUESTS_LIMIT),
            unlimited: !!user.unlimited,
            avatarUrl: user.avatar_url
        });

    } catch (err) {

        res.status(500).json({
            status: false,
            creator: 'Sakura',
            error: err.message
        });

    }

});

module.exports = router;
