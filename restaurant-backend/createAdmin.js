const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config(); // Load environment variables

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash('youradminpassword', 10); // Change password
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com', // Change email
      password: hashedPassword,
      isAdmin: true,
      address: 'Admin Address', // Provide address
      gender: 'Male',           // Provide gender
      age: 30                   // Provide age
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    mongoose.connection.close(); // Close the connection after insertion
  } catch (err) {
    console.error('Error creating admin user:', err);
    mongoose.connection.close();
  }
};

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(createAdmin)
  .catch(err => console.log('MongoDB connection error:', err));
