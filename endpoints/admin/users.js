const express = require('express');
const router = express.Router();

const supabaseAdmin = require('../../utils/supabaseAdmin');

router.get('/', async (req, res) => {

    if (!req.session || !req.session.user || !req.session.user.isAdmin) {
        return res.status(403).json({
            status: false,
            creator: 'Sakura',
            error: 'Solo administradores pueden ver esto'
        });
    }

    const { data, error } = await supabaseAdmin
        .from('users')
        .select('username, api_key, requests_used, requests_limit, unlimited, is_admin, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        return res.status(500).json({
            status: false,
            creator: 'Sakura',
            error: error.message
        });
    }

    res.json({
        status: true,
        creator: 'Sakura',
        users: data
    });

});

module.exports = router;
           
