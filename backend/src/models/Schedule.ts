import { model } from 'mongoose';
const mongoose = require('mongoose');
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const Schema = mongoose.Schema;
const scheduleSchema = new Schema({
  doctor_id: { type: String, required: true, ref: 'User' },
  schedule_date: { type: Date, required: true },
  schedule_time: { type: String, required: true },
  patient_id: { type: String },
  isBooked: {type: Boolean, default: false}
});

scheduleSchema.plugin(AutoIncrement, { inc_field: 'schedule_id' });


const Schedule = model('Schedule', scheduleSchema);

export default Schedule;
