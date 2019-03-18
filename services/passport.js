const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const mongoose = require('mongoose');

// fetch user out of mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
    // serialize the user.id from mongodb to an id saved in cookie
    done(null, user.id);
});
passport.deserializeUser((id, done)=>{
    // turn an id taken from cookie into a mongoose model instance
    User.findById(id)
        .then(user =>{
            done(null, user);
        })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleCLientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, email, done) => {
    User.findOne({ googleId: email.id })
        .then((existingUser) => {
            if (existingUser) {
                //aldready have a record with the given profile ID
                done(null, existingUser);
            } else {
                // create a javascript object, assign the id value and load it into mongo by save()
                new User({ googleId: email.id }).save()
                    .then(user => done(null, user));
            }
        })
    
}));
