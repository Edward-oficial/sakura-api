function requireAdmin(req, res, next) {

    if (req.session && req.session.user && req.session.user.isAdmin) {
        return next();
    }

    return res.redirect('/');

}

module.exports = requireAdmin;
