require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sujjusoftwaresolutions_db_user:Sujjuuppu2026@cluster0.g21d2ib.mongodb.net/sujju_software?retryWrites=true&w=majority&appName=Cluster0')
  .then(async () => {
    const targetEmail = 'sujjusoftwaresolutions@gmail.com';
    const targetUser = await User.findOne({ email: targetEmail });
    
    if(targetUser) {
       // Since the pre-save hook hashes the password if it's modified, we can just set it as plain text and save it!
       targetUser.password = 'Chinnu@183024-2026';
       targetUser.role = 'admin'; // ensure it's admin
       targetUser.emailVerified = true;
       targetUser.phoneVerified = true;
       await targetUser.save();
       console.log('\n✅ Successfully updated password and role for ' + targetEmail);
    } else {
       console.log('User not found!');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
