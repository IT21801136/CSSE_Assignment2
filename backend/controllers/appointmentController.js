const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  const { hospital, date } = req.body;

  try {
    const appointment = await Appointment.create({
      patient: req.user._id,
      hospital,
      date,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAppointmentsForPatient = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
