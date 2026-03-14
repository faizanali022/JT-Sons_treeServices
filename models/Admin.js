const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
});

adminSchema.statics.verifyPassword = async function(plainPassword, hash) {
    return bcrypt.compare(plainPassword, hash);
};

module.exports = mongoose.model('Admin', adminSchema);