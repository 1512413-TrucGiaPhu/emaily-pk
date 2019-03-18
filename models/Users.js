const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String
});

// load the schema into mongoose
mongoose.model('users', userSchema);