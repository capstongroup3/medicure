import { model } from 'mongoose';

const mongoose = require('mongoose');
import AutoIncrementFactory from 'mongoose-sequence';
const Schema = mongoose.Schema;
const AutoIncrement = AutoIncrementFactory(mongoose);
const appointmentSchema = new Schema({
  pname: { type: String, required: true, maxlength: 50 },
  phone: { type: String, required: true, maxlength: 12 },
  p_age: { type: String, required: true, maxlength: 10 },
  a_date: { type: Date, required: true },
  a_time: { type: String, required: true },
  problem: { type: String, required: true, maxlength: 300 },
  doc_id: { type: String, required: true, ref: 'User'  },
  pat_id: { type: String, required: true, ref: 'User'  },
  isAccepted: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

appointmentSchema.plugin(AutoIncrement, { inc_field: 'appointment_id' });

const Appointment = model('Appointment', appointmentSchema);

export default Appointment;
