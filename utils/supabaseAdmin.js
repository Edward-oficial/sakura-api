const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://nrwwwhgsyfrrunobupha.supabase.co';
const SUPABASE_SERVICE_KEY = 'sb_secret_R8-yOdGjYrk_K7lERYQj7Q_ruR1hvV2';

// OJO: esta key salta el RLS por completo. Solo se usa aquí, en el servidor.
// Nunca la mandes al navegador ni la pongas en public/js/app.js.
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});

module.exports = supabaseAdmin;
