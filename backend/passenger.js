// Namecheap cPanel Phusion Passenger Startup File
// This file allows Namecheap's cPanel Node.js Application Manager to boot your Express backend.

const app = require('./server'); // Imports express app configuration from server.js

// Phusion Passenger handles port binding automatically via environment variable or default
module.exports = app;
