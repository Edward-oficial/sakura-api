const supabase = require('./supabaseClient');

async function findUser(username) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .ilike('username', username)
        .maybeSingle();

    if (error) {
        console.error('[users] findUser:', error.message);
        return null;
    }

    return data;
}

async function findUserByApiKey(apiKey) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('api_key', apiKey)
        .maybeSingle();

    if (error) {
        console.error('[users] findUserByApiKey:', error.message);
        return null;
    }

    return data;
}

async function apiKeyExists(apiKey) {
    const { data } = await supabase
        .from('users')
        .select('id')
        .eq('api_key', apiKey)
        .maybeSingle();

    return !!data;
}

async function createUser(user) {
    const { data, error } = await supabase
        .from('users')
        .insert(user)
        .select()
        .single();

    if (error) throw new Error(error.message);

    return data;
}

async function updateUser(username, changes) {
    const { data, error } = await supabase
        .from('users')
        .update(changes)
        .ilike('username', username)
        .select()
        .single();

    if (error) throw new Error(error.message);

    return data;
}

module.exports = {
    findUser,
    findUserByApiKey,
    apiKeyExists,
    createUser,
    updateUser
};
