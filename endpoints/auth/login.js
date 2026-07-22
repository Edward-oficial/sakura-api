const express = require('express');
const router = express.Router();

const supabaseAuth = require('../../utils/supabaseClient');
const { findUserById } = require('../../utils/users');
const verifyCaptcha = require('../../utils/verifyCaptcha');

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

        const { data: authData, error: authError } = await supabaseAuth.auth.signInWithPassword({
            email: username,
            password
        });

        if (authError || !authData.user) {
            return res.status(401).json({
                status: false,
                creator: 'Sakura',
                error: authError ? authError.message : 'Usuario o contraseña incorrectos'
            });
        }

        const user = await findUserById(authData.user.id);

        if (!user) {
            return res.status(404).json({
                status: false,
                creator: 'Sakura',
                error: 'Tu cuenta existe en Auth pero no tiene fila en la tabla users'
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
            requestsLimit: user.unlimited ? null : user.requests_limit,
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
