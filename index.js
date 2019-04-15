const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/key')
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/Users')
require('./services/passport')

const app = express();

app.use(bodyParser.json());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

// app must go through set cookie, initialize() and session()
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets like our main.js/css file
    
    app.use(express.static('client/build'))
    // Epxress will serve up index.html file if don't file the route
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);