import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcryptjs';

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,          // Integer type
    primaryKey: true,                 // Primary key
    autoIncrement: true,              // Auto-increment
  },
  username: {
    type: DataTypes.STRING,           // String type
    allowNull: false,                 // Cannot be null
    unique: true,                     // Must be unique
    validate: {
      len: [4, 20],                   // Length between 4 and 20
    },
  },
  email: {
    type: DataTypes.STRING,           // String type
    allowNull: false,                 // Cannot be null
    unique: true,                     // Must be unique
    validate: {
      isEmail: true,                  // Must be a valid email
    },
  },
  password: {
    type: DataTypes.STRING,           // String type
    allowNull: false,                 // Cannot be null
    validate: {
      len: [6, 100],                  // Minimum length 6
    },
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      // Hash the user's password before saving to the database
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
  },
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Synchronize the model with the database
await User.sync()
  .then(() => console.log('User table created or already exists.'))
  .catch((err) => console.log('Error creating User table:', err));

export default User;
