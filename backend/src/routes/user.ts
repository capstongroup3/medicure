import { Router } from 'express';
import { UserController } from '../controllers/userContorller';
const userController: UserController = new UserController();
const router = Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/profile/:id' ,userController.getUserProfile); 


export default router;