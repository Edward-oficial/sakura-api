const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://nrwwwhgsyfrrunobupha.supabase.co';
const SUPABASE_KEY = 'sb_publishable_di3F1Rzi-B9N_e7VAToFoA_4T2CRiCG';

// Esta key solo se usa para auth.signUp / auth.signInWithPassword.
// Para leer/escribir la tabla users se usa supabaseAdmin.js (service role).
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});

module.exports = supabase;
