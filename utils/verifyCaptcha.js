const axios = require('axios');

async function verifyCaptcha(token) {
    if (!token) return false;

    try {
        const { data } = await axios.post(
            'https://hcaptcha.com/siteverify',
            new URLSearchParams({
                secret: process.env.HCAPTCHA_SECRET,
                response: token
            })
        );

        return data.success === true;
    } catch (err) {
        return false;
    }
}

module.exports = verifyCaptcha;