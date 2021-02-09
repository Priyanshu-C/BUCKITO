const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dateOfBirth: String,
    alreadyWatchedMovies: [String],
    recommendedMovies: [String],
    bucketList: [String],
    genre: [String],
    password: {
        type: String,
        required: true,
        unique: true,
    },
});

//Export the model
module.exports = mongoose.model("User", userSchema);
