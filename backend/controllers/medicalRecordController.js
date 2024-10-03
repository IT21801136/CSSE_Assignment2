const MedicalRecord = require('../models/MedicalRecord');

exports.addMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.create({
      patient: req.user._id,
      record: req.body.record,
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMedicalRecordsForPatient = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patient: req.user._id });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
