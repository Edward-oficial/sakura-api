const fs = require('fs');
const path = require('path');

const apiKeyAuth = require('../middleware/apiKeyAuth');

// Esta categoría NO pide API key (login/registro no pueden pedirla)
const EXCLUDED_FROM_APIKEY = ['auth'];

/**
 * Recorre recursivamente /endpoints y monta cada archivo .js como router.
 *
 * Ejemplo:
 *   endpoints/ejemplo/ping.js  ->  GET /ejemplo/ping  (requiere ?apikey=)
 *   endpoints/auth/login.js    ->  POST /auth/login    (no requiere apikey)
 *
 * Para agregar una categoría nueva:
 *   1) Crea la carpeta endpoints/NOMBRE_CATEGORIA
 *   2) Mete ahí tus archivos .js (cada uno = un endpoint de esa categoría)
 *   3) Crea public/NOMBRE_CATEGORIA.html con sus tarjetas
 *   4) Agrega la ruta limpia en index.js (app.get('/NOMBRE_CATEGORIA', ...))
 */
function loadRoutes(app, dir, basePath = '/') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            loadRoutes(app, fullPath, path.posix.join(basePath, entry.name));
            continue;
        }

        if (!entry.name.endsWith('.js')) continue;

        const routeName = entry.name.replace(/\.js$/, '');
        const mountPath = path.posix.join(basePath, routeName);

        const category = mountPath.split('/').filter(Boolean)[0];
        const needsApiKey = !EXCLUDED_FROM_APIKEY.includes(category);

        try {
            const router = require(fullPath);

            if (needsApiKey) {
                app.use(mountPath, apiKeyAuth, router);
            } else {
                app.use(mountPath, router);
            }

            console.log(`[route] ${mountPath}${needsApiKey ? ' (requiere apikey)' : ''}`);
        } catch (err) {
            console.error(`[route error] ${fullPath}:`, err.message);
        }
    }
}

module.exports = loadRoutes;