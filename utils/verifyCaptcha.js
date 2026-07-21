const axios = require('axios');

// TODO: Configura tu HCAPTCHA_SECRET en .env
// const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET;
const HCAPTCHA_SECRET = ''; // Reemplaza con tu secret real de hCaptcha

async function verifyCaptcha(token) {
    if (!token || !HCAPTCHA_SECRET) return false;

    try {
        const { data } = await axios.post(
            'https://hcaptcha.com/siteverify',
            new URLSearchParams({
                secret: HCAPTCHA_SECRET,
                response: token
            })
        );

        return data.success === true;
    } catch (err) {
        return false;
    }
}

module.exports = verifyCaptcha;