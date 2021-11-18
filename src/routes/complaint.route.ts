import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { requireAuth, validateRequest } from '@aonautilus/ticketingcommon';

import { CreateComplaintService } from '../services/complaints/create.service';
import { ListAllComplaints } from '../services/complaints/list-all.service';
import { multerProvider } from '../config/multer.config';

const router = express.Router();
const upload = multerProvider();

router.post(
  '/api/complaints',
  upload.getInstance().array('image',5),
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
    const { type, latitude, longitude, desc } = req.body;
    const images = req.files as Express.Multer.File[];

    const createComplaintService = new CreateComplaintService();

    const newComplaint = await createComplaintService.execute({ latitude, longitude, type, desc, images })

    res.status(201).send(newComplaint);
});

router.get(
  '/api/all-complaints',
  async (req: Request, res: Response) => {
    const listAllComplaintsService = new ListAllComplaints();

    const complaintsList = await listAllComplaintsService.execute();

    res.status(200).send(complaintsList);
});

router.post(
  '/api/upload',
  upload.getInstance().array('image',5),
  async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.files);
    res.status(200).send({message: 'File uploaded'});
  }
);

export { router as complaintRouter };
