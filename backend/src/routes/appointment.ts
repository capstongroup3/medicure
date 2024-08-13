import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment';
const appointmentController: AppointmentController = new AppointmentController();
const router = Router();



router.post('/add-appointment', appointmentController.createAppointment);
router.get('/get-appointment', appointmentController.getAppointments);
router.put('/:id/status', appointmentController.updateAppointmentStatus);

export default router;