exports.homepage = function(req, res) {
    res.render('home', {myVar: req.user.username}
    )};
