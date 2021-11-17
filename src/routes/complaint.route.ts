import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { requireAuth, validateRequest } from '@aonautilus/ticketingcommon';

import { CreateComplaintService } from '../services/complaints/create.service';

const router = express.Router();

router.post(
  '/api/complaints',
  // requireAuth,
  [
    body('type')
      .not()
      .isEmpty()
      .withMessage('type is required'),
    body('latitude')
      .not()
      .isEmpty()
      .matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)
      .withMessage('latitude is invalid'),      
    body('longitude')
      .not()
      .isEmpty()
      .matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)
      .withMessage('longitude is invalid'),
    body('desc')
      .trim()
      .escape()
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { type, latitude, longitude, desc, status } = req.body;

    const createComplaintService = new CreateComplaintService();

    const newComplaint = await createComplaintService.execute({ latitude, longitude, type, desc })

    res.status(201).send(newComplaint);
});

export { router as complaintRouter };
