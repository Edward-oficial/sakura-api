const express = require('express');
const router = express.Router();

const supabaseAdmin = require('../../utils/supabaseAdmin');
const generateApiKey = require('../../utils/apiKey');

const ADMIN_EMAIL = 'edwardshanti3@gmail.com';
const ADMIN_PASSWORD = 'edwardshanti3@gmail.com';
const REQUESTS_LIMIT = 1000;
const RESET_DAYS = 30;

// Cambia esto por lo que quieras, es solo para que no cualquiera lo dispare por accidente
const SETUP_KEY = 'sakura-setup-2026';

router.get('/', async (req, res) => {

    if (req.query.key !== SETUP_KEY) {
        return res.status(403).json({
            status: false,
            creator: 'Sakura',
            error: 'Key inválida. Usa /setup/seedAdmin?key=sakura-setup-2026'
        });
    }

    try {

        let authUser;

        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            email_confirm: true
        });

        if (authError) {

            const yaExiste = /already.*registered|already.*exists/i.test(authError.message);

            if (!yaExiste) {
                return res.status(500).json({
                    status: false,
                    creator: 'Sakura',
                    error: authError.message
                });
            }

            const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers();

            if (listError) {
                return res.status(500).json({
                    status: false,
                    creator: 'Sakura',
                    error: listError.message
                });
            }

            authUser = listData.users.find(u => u.email === ADMIN_EMAIL);

            if (!authUser) {
                return res.status(500).json({
                    status: false,
                    creator: 'Sakura',
                    error: 'No se encontró la cuenta existente en Auth'
                });
            }

        } else {

            authUser = authData.user;

        }

        const apiKey = await generateApiKey();

        const { data: userRow, error: insertError } = await supabaseAdmin
            .from('users')
            .insert({
                id: authUser.id,
                username: ADMIN_EMAIL,
                api_key: apiKey,
                requests_used: 0,
                requests_limit: REQUESTS_LIMIT,
                reset_at: new Date(Date.now() + RESET_DAYS * 24 * 60 * 60 * 1000).toISOString(),
                unlimited: true,
                is_admin: true
            })
            .select()
            .single();

        if (insertError) {
            return res.status(500).json({
                status: false,
                creator: 'Sakura',
                error: insertError.message
            });
        }

        res.json({
            status: true,
            creator: 'Sakura',
            message: 'Cuenta admin creada/actualizada correctamente',
            username: userRow.username,
            apiKey: userRow.api_key
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
