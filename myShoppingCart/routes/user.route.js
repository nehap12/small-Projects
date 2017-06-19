/**
 * Created by NehaM on 6/18/2017.
 */


module.exports = function(app, passport){

    app.get('/', function (req, res) {

        res.render('index.ejs');

    });

    /////////////////////
    //Login
    ////////////////////
    app.get('/login', function (req, res) {

        res.render('login.ejs', { message: req.flash('loginMessage') });

    });


    app.post('/login', passport.authenticate('local-login', {

        successRedirect : '/dashboard',
        failureRedirect : '/login',
        failureFlash : true

    }));

    /////////////////////
    //Signup
    ////////////////////
    app.get('/signup', function (req, res) {

        res.render('signup.ejs', { message: req.flash('signUpMessage') });

    });

    app.post('/signup', passport.authenticate ('local-signup', {

        successRedirect : '/dashboard',
        failureRedirect : '/signup',
        failureFlash : true

    }));

    app.get('/dashboard', isLoggedIn, function(req, res) {

        res.render('dashboard.ejs', {

            user : req.user // get the user out of session and pass to template

        });

    });

    app.get('/logout', function(req, res) {

        req.logout();
        res.redirect('/');

    });

};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}