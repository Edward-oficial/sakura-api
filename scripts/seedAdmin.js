const supabaseAdmin = require('../utils/supabaseAdmin');
const generateApiKey = require('../utils/apiKey');

const ADMIN_EMAIL = 'edwardshanti3@gmail.com';
const ADMIN_PASSWORD = 'edwardshanti3@gmail.com'; // el correo es la contraseña, como pediste

const REQUESTS_LIMIT = 1000;
const RESET_DAYS = 30;

async function seedAdmin() {

    console.log('Creando cuenta admin en Supabase Auth...');

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true // así no necesita confirmar correo, queda lista de una vez
    });

    if (authError) {
        console.error('Error creando el usuario en Auth:', authError.message);
        process.exit(1);
    }

    const apiKey = await generateApiKey();

    const { data: userRow, error: insertError } = await supabaseAdmin
        .from('users')
        .insert({
            id: authData.user.id,
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
        console.error('Error insertando en la tabla users:', insertError.message);
        process.exit(1);
    }

    console.log('Listo, cuenta admin creada:');
    console.log('  usuario:', userRow.username);
    console.log('  apiKey:', userRow.api_key);

    process.exit(0);

}

seedAdmin();
