const express = require('express');
const multer = require('multer');
const router = express.Router();

const supabaseAdmin = require('../../utils/supabaseAdmin');
const { updateUser } = require('../../utils/users');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

router.post('/', upload.single('avatar'), async (req, res) => {

    try {

        if (!req.session || !req.session.user) {
            return res.status(401).json({
                status: false,
                creator: 'Sakura',
                error: 'No has iniciado sesión'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                status: false,
                creator: 'Sakura',
                error: 'No mandaste ninguna imagen (campo "avatar")'
            });
        }

        const username = req.session.user.username;
        const ext = (req.file.originalname.split('.').pop() || 'jpg').toLowerCase();
        const fileName = `${username}-${Date.now()}.${ext}`;

        const { error: uploadError } = await supabaseAdmin.storage
            .from('avatars')
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: true
            });

        if (uploadError) {
            return res.status(500).json({
                status: false,
                creator: 'Sakura',
                error: 'Error subiendo la imagen: ' + uploadError.message
            });
        }

        const { data: publicUrlData } = supabaseAdmin.storage
            .from('avatars')
            .getPublicUrl(fileName);

        const avatarUrl = publicUrlData.publicUrl;

        await updateUser(username, { avatar_url: avatarUrl });

        req.session.user.avatarUrl = avatarUrl;

        res.json({
            status: true,
            creator: 'Sakura',
            avatarUrl
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
