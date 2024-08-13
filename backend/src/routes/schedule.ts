import { Router } from 'express';
import { ScheduleController } from '../controllers/schedule';
const scheduleController: ScheduleController = new ScheduleController();
const router = Router();

router.post('/add-schedule', scheduleController.createSchedule);
router.get('/get-schedule', scheduleController.getSchedules);
export default router;