
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/User";
import { Constants } from "../config/constants";
export class UserController {


  secret = process.env.JWT_SECRET || 'aeae56b8c0618cbff6f8ce302ff6d3d899c8c5bc55364987ac7ab2d4b0fbda89e715483d1afd2c0504ca42831f61e6a298259ddb6eceb7056f9f3f502a70ceb1';

  public signUp = async (req: Request, res: Response) => {
    console.log('Signup request received', req.body); // Add this line
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        res.status(200)
          .send({
            message: 'User is already exist, please login!',
            status: Constants.FAIL
          });
        return;
      } else {
        const newUser: IUser = {
          name: req.body.name,
          email: email.toLowerCase(),
          password: req.body.password,
          userType: req.body.userType,
        }

        const dbUser = await User.create(newUser);
        res.status(200).send({
          status: Constants.SUCCEESS,
          message: "Your account Created Successfully!",
          data: dbUser
        })
      }

    } catch (error) {
      console.log("Error is---->", error);
      res.status(400).send({
        status: Constants.FAIL,
        message: "There is an error in creating your account.Please try again later."
      })
    }
  }

  public login = async (req: Request, res: Response) => {
    const { email, password, userType } = req.body;

    console.log('Received login request:', req.body);

    try {
      // Find the user by email
      const user = await User.findOne({ email: email.toString() });

      if (user) {
        // Validate password and userType
        if (user.password === password && user.userType === userType) {
          const token = jwt.sign({ userId: user._id },this.secret, { expiresIn: '1h' });

          res.status(200).json({ message: 'Login successful', token, user });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
  public getUserProfile = async (req: Request, res: Response) => {
    const userId = req.params.id.toString();

    try {
      const user = await User.findById({ _id: userId }); // Exclude password from the response

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}