const express = require('express');
const router = express.Router();
const yts = require('yt-search');

router.get('/', async (req, res) => {

    try {

        const query = req.query.q || req.query.query;

        if (!query) {
            return res.status(400).json({
                status: false,
                creator: 'Sakura',
                error: 'Falta el parámetro q. Ejemplo: /search/ytsearch?q=daddy yankee&apikey=TU_API_KEY'
            });
        }

        const { videos } = await yts(query);

        if (!videos || videos.length === 0) {
            return res.json({
                status: true,
                creator: 'Sakura',
                query,
                result: []
            });
        }

        const result = videos.slice(0, 10).map(v => ({
            title: v.title,
            videoId: v.videoId,
            url: v.url,
            thumbnail: v.thumbnail,
            duration: v.timestamp,
            views: v.views,
            publicado: v.ago,
            autor: v.author ? v.author.name : null
        }));

        res.json({
            status: true,
            creator: 'Sakura',
            query,
            result
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
              
