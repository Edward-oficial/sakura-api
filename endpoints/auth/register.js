const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const { findUser, createUser } = require('../../utils/users');
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

        const existing = await findUser(username);

        if (existing) {
            return res.status(409).json({
                status: false,
                creator: 'Sakura',
                error: 'Ese usuario ya existe'
            });
        }

        const hash = await bcrypt.hash(password, 10);
        const apiKey = await generateApiKey();

        const newUser = await createUser({
            username,
            password: hash,
            api_key: apiKey,
            requests_used: 0,
            requests_limit: REQUESTS_LIMIT,
            reset_at: new Date(Date.now() + RESET_DAYS * 24 * 60 * 60 * 1000).toISOString(),
            unlimited: false
            // avatar_url no se manda: Supabase le pone la sakura por defecto sola
        });

        // Login forzoso: al registrarse ya queda la sesión abierta
        req.session.user = {
            username: newUser.username,
            apiKey: newUser.api_key,
            avatarUrl: newUser.avatar_url
        };

        res.json({
            status: true,
            creator: 'Sakura',
            message: 'Usuario registrado correctamente',
            apiKey: newUser.api_key,
            requestsLimit: newUser.requests_limit,
            avatarUrl: newUser.avatar_url
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
