import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [hospital, setHospital] = useState('');
  const [date, setDate] = useState('');
  const [role, setRole] = useState('');

  // Fetch user role and appointments
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token available, please log in.');
      }

      // Get role
      const userResponse = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRole(userResponse.data.role);

      // Get appointments based on role
      const response = role === 'staff' || role === 'admin'
        ? await axios.get('/api/appointments/staff', { headers: { Authorization: `Bearer ${token}` } })
        : await axios.get('/api/appointments/patient', { headers: { Authorization: `Bearer ${token}` } });

      setAppointments(response.data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [role]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token available, please log in.');
      }

      await axios.post(
        '/api/appointments/create',
        { hospital, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAppointments(); // Refresh appointments list
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleUpdate = async (id, newDate) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/appointments/${id}`, { date: newDate }, { headers: { Authorization: `Bearer ${token}` } });
      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/appointments/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{role === 'staff' || role === 'admin' ? 'Manage Appointments' : 'Book Appointment'}</h2>

      {role === 'user' && (
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
      )}

      <h3>Your Appointments</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            {appt.hospital} - {new Date(appt.date).toLocaleDateString()}
            {role === 'staff' || role === 'admin' ? (
              <>
                <button onClick={() => handleUpdate(appt._id, prompt('Enter new date'))}>Edit</button>
                {role === 'admin' && <button onClick={() => handleDelete(appt._id)}>Delete</button>}
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
