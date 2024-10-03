// frontend/src/components/MedicalRecords.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState('');

  const fetchRecords = async () => {
    try {
      const response = await axios.get('/api/medical-records/patient', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRecords(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleAddRecord = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/medical-records/add',
        { record },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchRecords(); // Refresh records list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Medical Record</h2>
      <form onSubmit={handleAddRecord}>
        <textarea
          value={record}
          onChange={(e) => setRecord(e.target.value)}
          required
        />
        <button type="submit">Add Record</button>
      </form>

      <h3>Your Medical Records</h3>
      <ul>
        {records.map((rec) => (
          <li key={rec._id}>{rec.record}</li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalRecords;
