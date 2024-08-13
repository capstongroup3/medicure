import { Request, Response } from 'express';
import Assessment from '../models/Assessment';
export class AssessmentController {

    // Example function to create a new schedule
    public createAssessment = async (req: Request, res: Response) => {
        try {
            const newAssessment = new Assessment({
                q1_score: req.body.q1_score,
                q2_score: req.body.q2_score,
                q3_score: req.body.q3_score,
                q4_score: req.body.q4_score,
                q5_score: req.body.q5_score,
                q6_score: req.body.q6_score,
                q7_score: req.body.q7_score,
                q8_score: req.body.q8_score,
                q9_score: req.body.q9_score,
                q10_score: req.body.q10_score,
                total_score: req.body.total_score,
                date: req.body.date,
                time: req.body.time,
                pat_id: req.body.pat_id
            });

            await newAssessment.save();
            console.log('add successfully')
            res.status(201).json(newAssessment);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // Example function to get all schedules
    public getAssessment = async (req: Request, res: Response) => {
        try {
            const assemssments = await Assessment.find()
                .populate('pat_id', 'name');;
            res.status(200).json(assemssments);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
