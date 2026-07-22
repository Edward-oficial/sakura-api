const { findUserByApiKey, updateUser } = require('../utils/users');

const DEFAULT_LIMIT = 1000;
const RESET_DAYS = 30;

async function apiKeyAuth(req, res, next) {

    try {

        const apiKey = req.query.apikey || req.headers['x-api-key'];

        if (!apiKey) {
            return res.status(401).json({
                status: false,
                creator: 'Edward',
                error: 'Falta la API key. Agrega ?apikey=TU_API_KEY a la petición'
            });
        }

        const user = await findUserByApiKey(apiKey);

        if (!user) {
            return res.status(401).json({
                status: false,
                creator: 'Edward',
                error: 'API key inválida'
            });
        }

        if (user.unlimited) {
            return next();
        }

        const now = Date.now();
        const resetAtMs = user.reset_at ? new Date(user.reset_at).getTime() : 0;

        let requestsUsed = user.requests_used || 0;
        let resetAt = user.reset_at;

        if (now >= resetAtMs) {
            requestsUsed = 0;
            resetAt = new Date(now + RESET_DAYS * 24 * 60 * 60 * 1000).toISOString();
        }

        const limit = user.requests_limit || DEFAULT_LIMIT;

        if (requestsUsed >= limit) {
            await updateUser(user.username, {
                requests_used: requestsUsed,
                reset_at: resetAt
            });

            return res.status(429).json({
                status: false,
                creator: 'Edward',
                error: 'Alcanzaste el límite de solicitudes de tu API key este mes',
                requestsUsed,
                requestsLimit: limit,
                resetAt
            });
        }

        requestsUsed += 1;

        await updateUser(user.username, {
            requests_used: requestsUsed,
            reset_at: resetAt
        });

        req.apiUser = {
            username: user.username,
            requestsUsed,
            requestsLimit: limit
        };

        next();

    } catch (err) {

        res.status(500).json({
            status: false,
            creator: 'Edward',
            error: err.message
        });

    }

}

module.exports = apiKeyAuth;
