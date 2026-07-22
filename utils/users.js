const supabaseAdmin = require('./supabaseAdmin');

async function findUser(username) {
    const { data, error } = await supabaseAdmin
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

async function findUserById(id) {
    const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (error) {
        console.error('[users] findUserById:', error.message);
        return null;
    }

    return data;
}

async function findUserByApiKey(apiKey) {
    const { data, error } = await supabaseAdmin
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
    const { data } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('api_key', apiKey)
        .maybeSingle();

    return !!data;
}

async function createUser(user) {
    const { data, error } = await supabaseAdmin
        .from('users')
        .insert(user)
        .select()
        .single();

    if (error) throw new Error(error.message);

    return data;
}

async function updateUser(username, changes) {
    const { data, error } = await supabaseAdmin
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
    findUserById,
    findUserByApiKey,
    apiKeyExists,
    createUser,
    updateUser
};
