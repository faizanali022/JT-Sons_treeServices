const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config(); // looks for .env in current working directory

const Admin = require('../models/Admin');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const password = process.env.ADMIN_PASSWORD || 'Jt&5ons#Tree!2025Admin';
        const passwordHash = await bcrypt.hash(password, 10);
        
        const existing = await Admin.findOne({ username: 'admin' });
        if (existing) {
            console.log('Admin already exists. Updating password...');
            existing.passwordHash = passwordHash;
            await existing.save();
            console.log('Password updated.');
        } else {
            await Admin.create({ username: 'admin', passwordHash });
            console.log('Admin created successfully.');
        }
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

createAdmin();