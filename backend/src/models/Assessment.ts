import { model } from 'mongoose';

const mongoose = require('mongoose');
import AutoIncrementFactory from 'mongoose-sequence';
const Schema = mongoose.Schema;
const AutoIncrement = AutoIncrementFactory(mongoose);
const assesmentSchema = new Schema({
  q1_score: { type: Number, required: true},
  q2_score: { type: Number, required: true},
  q3_score: { type: Number, required: true},
  q4_score: { type: Number, required: true},
  q5_score: { type: Number, required: true},
  q6_score: { type: Number, required: true},
  q7_score: { type: Number, required: true},
  q8_score: { type: Number, required: true},
  q9_score: { type: Number, required: true},
  q10_score: { type: Number, required: true},
  total_score: {type: Number,required: true},
  date:{ type: Date, required: true },
  time: { type: String, required: true },
  pat_id: { type: String, required: true, ref: 'User'  },
});

assesmentSchema.plugin(AutoIncrement, { inc_field: 'assessment_id' });

const Assessment = model('Assessment', assesmentSchema);

export default Assessment;
