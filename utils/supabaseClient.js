const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://nrwwwhgsyfrrunobupha.supabase.co';
const SUPABASE_KEY = 'sb_publishable_di3F1Rzi-B9N_e7VAToFoA_4T2CRiCG';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
