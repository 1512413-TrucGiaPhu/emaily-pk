const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String,
    credits: { type: Number, default: 0 }
});

// load the schema into mongoose
mongoose.model('users', userSchema);