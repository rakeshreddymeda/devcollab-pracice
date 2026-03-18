console.log('Loading environment...');
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
console.log(`Attempting to connect to database... (URI length: ${uri.length})`);

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        console.log('Connected to MongoDB');

        // Check if admin exists
        const existingAdmin = await User.findOne({ username: 'admin@email.com' });
        if (existingAdmin) {
            console.log('Admin already exists');
            process.exit();
        }

        // Create Admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const user = new User({
            name: "Admin User",
            email: 'admin@email.com',
            password: hashedPassword,
            role: 'admin'
        });

        await user.save();
        console.log('Admin user created successfully');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
