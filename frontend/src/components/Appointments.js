// frontend/src/components/Appointments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [hospital, setHospital] = useState('');
  const [date, setDate] = useState('');

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments/patient', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/appointments/create',
        { hospital, date },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchAppointments(); // Refresh appointments list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleBooking}>
        <input
          type="text"
          placeholder="Hospital"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Book Appointment</button>
      </form>

      <h3>Your Appointments</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>{appt.hospital} - {new Date(appt.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
