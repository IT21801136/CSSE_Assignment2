const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();  // Load environment variables before anything else

// Import Firebase service account key
const serviceAccount = require('./medical-app-2f9f4-firebase-adminsdk-n3111-1f544ce186.json');

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET  // Make sure .env file has this key
});

const bucket = admin.storage().bucket(); // Access the Firebase Storage bucket

// Import routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
connectDB(); // Connect to the database

app.use(cors());
app.use(express.json());  // Parse JSON requests

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/payment', paymentRoutes); // Payment routes
app.use('/api/report', reportRoutes);   // Report routes

app.use(cors({
    origin: 'http://localhost:5000', // Allow requests from the React app running on port 5000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

// Define the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));