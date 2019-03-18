const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/key')
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/Users')
require('./services/passport')

const app = express();


mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app)


const PORT = process.env.PORT || 5000;
app.listen(PORT);