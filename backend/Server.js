// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reportRoutes = require('./routes/reportRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/payment', paymentRoutes); // Payment routes
app.use('/api/report', reportRoutes);   // Report routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
