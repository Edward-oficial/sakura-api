const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://nrwwwhgsyfrrunobupha.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yd3d3aGdzeWZycnVub2J1cGhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDY3NjUxNCwiZXhwIjoyMTAwMjUyNTE0fQ.jG9x6JQ8KSIt7d6cnHOJOeEWuKTxvYz1clU6bZf6t1g';

// OJO: esta key salta el RLS por completo. Solo se usa aquí, en el servidor.
// Nunca la mandes al navegador ni la pongas en public/js/app.js.
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});

module.exports = supabaseAdmin;
