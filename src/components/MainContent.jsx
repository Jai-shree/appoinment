import React, { useEffect, useState } from 'react';
import './MainContent.css';

const MainContent = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://65.2.122.6:3000/appointments");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
        setAppointments(data); 
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p className='loading-text'>Loading...</p>;
  if (error) return <p className='error-text'>Error: {error}</p>;

  return (
    <div className="main-content">
      <h2>Appointment List</h2>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>UHID</th>
            <th>Appointment Date</th>
            <th>Time Slot</th>
            <th>Department</th>
            <th>Doctor</th>
            <th>Appointment Type</th>
            <th>Patient Type</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.patientName.split(" ")[0]}</td>
              <td>{appointment.patientName.split(" ")[1]}</td>
              <td>{appointment.UHID}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentTime}</td>
              <td>{appointment.department}</td>
              <td>{appointment.doctorName}</td>
              <td>General</td> {}
              <td>Outpatient</td> {}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainContent;
