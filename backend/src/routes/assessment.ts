import { Router } from 'express';
import { AssessmentController } from '../controllers/assessment';
const assessmentController: AssessmentController = new AssessmentController();
const router = Router();

router.post('/add-assessment', assessmentController.createAssessment);
router.get('/get-assessment', assessmentController.getAssessment);
export default router;