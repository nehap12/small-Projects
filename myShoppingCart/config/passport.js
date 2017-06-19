/**
 * Created by NehaM on 6/18/2017.
 */


var localStrategy = require('passport-local').Strategy;

var User = require('../models/user.model').User;

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new localStrategy({

            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function (req, email, password, done) {

            process.nextTick(function () {
                User.findOne({'email': email}, function (err, user) {
                    if(err) {
                        return done(err);
                    }

                    if(user) {
                        return done(null, false, req.flash('signUpMessage','The email id is already in use.'));
                    } else {
                        var newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.admin = false;

                        newUser.save(function (err) {
                            if(err) {
                                throw err;
                            }

                            return done(null, newUser);
                        });
                    }
                });
            });

        }));



    passport.use('local-login', new localStrategy({

            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function (req, email, password, done) {

            User.findOne({'email': email}, function (err, user) {
                if(err) {
                    return done(err);
                }

                if(!user) {
                    return done(null, false, req.flash('loginMessage','No user found.'));
                }

                if(!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage','Password is not correct!'));
                }

                return done(null, user);

            });

        }));

};