const { readUsers } = require('./users');

// Genera algo como "Sakura4821". Solo hay 10,000 combinaciones posibles
// (0000-9999), así que se revisa contra los usuarios existentes para
// nunca repetir una key. Si el proyecto crece mucho, conviene subir
// a más dígitos o volver a un formato random más largo.
function generateApiKey() {

    const users = readUsers();
    const existing = new Set(users.map(u => u.apiKey).filter(Boolean));

    let key;
    let attempts = 0;

    do {
        const digits = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        key = `Sakura${digits}`;
        attempts++;
    } while (existing.has(key) && attempts < 10000);

    return key;
}

module.exports = generateApiKey;