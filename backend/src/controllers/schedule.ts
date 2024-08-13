import { Request, Response } from 'express';
import Schedule from '../models/Schedule';
import { Constants } from '../config/constants';
export class ScheduleController {

// Example function to create a new schedule
public createSchedule = async (req: Request, res: Response) => {

  try {
    console.log('Received request body:', req.body);
    const { doctor_id, schedule_date, schedule_time } = req.body;

    // Ensure the schedule date is not in the past
    if (new Date(schedule_date) < new Date()) {
      return res.status(400).json({ error: 'Cannot create a schedule for a past date.' });
    }

    // Check if the schedule already exists
    const existingSchedule = await Schedule.findOne({ doctor_id, schedule_date, schedule_time });
    if (existingSchedule) {
      return res.status(400).json({ error: 'Schedule already exists for this doctor at the specified date and time.' });
    }

    const newSchedule = new Schedule({
      doctor_id,
      schedule_date: new Date(schedule_date).toISOString().split('T')[0],
      schedule_time
    });

    const schedule = await newSchedule.save();
    console.log('Created schedule:', schedule);
    res.json(schedule);
  } catch (error) {
    console.error("Error is---->", error);
    res.status(400).json({ error: 'Unable to save schedule', details: error });
  }
};

// Example function to get all schedules
public getSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await Schedule.find({ isBooked: false }).populate('doctor_id', 'name'); // Populate doctor_id with name field from User
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
}
