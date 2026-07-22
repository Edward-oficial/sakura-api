const { apiKeyExists } = require('./users');

// Genera algo como "Sakura4821" y revisa contra Supabase que no se repita.
async function generateApiKey() {

    let attempts = 0;

    while (attempts < 10000) {
        const digits = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        const key = `Sakura${digits}`;

        const exists = await apiKeyExists(key);

        if (!exists) return key;

        attempts++;
    }

    throw new Error('No se pudo generar una API key única');
}

module.exports = generateApiKey;
