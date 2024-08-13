import { Request, Response } from 'express';
import Appointment from '../models/Appointment';
import Schedule from '../models/Schedule';
export class AppointmentController {
// Example function to create a new appointment
public createAppointment = async (req: Request, res: Response) => {
  try {
    // Step 1: Check if the schedule exists and is not booked
    const schedule = await Schedule.findOne({
      doctor_id: req.body.doc_id,
      schedule_date: req.body.a_date,
      schedule_time: req.body.a_time,
      isBooked: false
    });

    if (!schedule) {
      return res.status(400).json({ error: 'Schedule not available or already booked' });
    }

    // Step 2: Update the schedule to mark it as booked
    schedule.isBooked = true;
    schedule.patient_id = req.body.pat_id;
    await schedule.save();

    // Step 3: Create the new appointment
    const newAppointment = new Appointment({
      pname: req.body.pname,
      phone: req.body.phone,
      p_age: req.body.p_age,
      a_date: req.body.a_date,
      a_time: req.body.a_time,
      problem: req.body.problem,
      doc_id: req.body.doc_id,
      pat_id: req.body.pat_id
    });

    await newAppointment.save();
    return res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Example function to get all appointments
public getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find() .populate('doc_id', 'name')
    .populate('pat_id', 'name');;
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

public updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body;

    // Ensure status is either 'accept' or 'reject'
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    // Find the appointment by ID and update its status
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { isAccepted: status }, // You can also add additional fields if needed, like a timestamp for when the action was taken
      { new: true } // Return the updated document
    );

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
}
