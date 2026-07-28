/**
 * Seed Script - Add test certificates to MongoDB
 * Run: node seedCertificates.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Certificate = require('./models/Certificate');

const sampleCertificates = [
  {
    certificateId: 'SSS2025-001',
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul@example.com',
    course: 'Full Stack Web Development',
    collegeName: 'JNTU Hyderabad',
    rollNumber: '21CS1A0501',
    department: 'CSE',
    year: '3rd Year',
    issuedDate: new Date('2025-06-15'),
    status: 'active',
  },
  {
    certificateId: 'SSS2025-002',
    studentName: 'Priya Reddy',
    studentEmail: 'priya@example.com',
    course: 'Python & Machine Learning',
    collegeName: 'Osmania University',
    rollNumber: '22CS2A1234',
    department: 'IT',
    year: '2nd Year',
    issuedDate: new Date('2025-07-01'),
    status: 'active',
  },
  {
    certificateId: 'SSS2025-003',
    studentName: 'Arun Kumar',
    studentEmail: 'arun@example.com',
    course: 'React & Node.js Internship',
    collegeName: 'Vasavi Engineering College',
    rollNumber: '20CS3B4567',
    department: 'ECE',
    year: '4th Year',
    issuedDate: new Date('2025-05-20'),
    status: 'active',
  },
  {
    certificateId: 'SSS2026-001',
    studentName: 'Sneha Patil',
    studentEmail: 'sneha@example.com',
    course: 'Java & Spring Boot',
    collegeName: 'CVR College of Engineering',
    rollNumber: '23CS1A0789',
    department: 'CSE',
    year: '1st Year',
    issuedDate: new Date('2026-01-10'),
    status: 'active',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing certificates
    await Certificate.deleteMany({});
    console.log('🗑️  Cleared existing certificates');

    // Insert new ones
    const inserted = await Certificate.insertMany(sampleCertificates);
    console.log(`✅ Inserted ${inserted.length} sample certificates:`);
    inserted.forEach(c => console.log(`   - ${c.certificateId}: ${c.studentName} — ${c.course}`));

    console.log('\n🎉 Seed complete! Test with these IDs:');
    inserted.forEach(c => console.log(`   ${c.certificateId}`));

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();
