const router = express.Router();

/* confirm user access authorization */
const confirmUserAuth = function(req, res, next) {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', confirmUserAuth, function(req, res, next) {
    res.render('profile', { user: req.user }
    ).catch(next);
});

module.exports = router;