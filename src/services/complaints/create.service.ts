import { BadRequestError } from '@aonautilus/ticketingcommon';
import { Complaint, Status, ComplaintType, Images } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

type CreateComplaintType = {
  type: string;
  latitude: string;
  longitude: string;
  desc?: string;
  images?: Express.Multer.File[];
}

type ImagesArray = {
  filename: string;
  originalFileName: string;
};

class CreateComplaintService {

  public async execute(dto: CreateComplaintType): Promise<Complaint> {
    const imagesArray: ImagesArray[] = [];

    dto.images?.map((image => {
      imagesArray.push({
        filename: image.filename,
        originalFileName: image.originalname,
      });
    }));

    try { 
      const newComplaint = await prismaClient.complaint.create({
        data: {
          latitude: dto.latitude,
          longitude: dto.longitude,
          desc: dto.desc,
          status: Status.ATIVO,
          type: dto.type as ComplaintType,
          Images: {
            create: [
              ...imagesArray
            ]
          }
        },
      });
  
      return newComplaint;
    } catch {
      throw new BadRequestError('Error creating complaint');
    }
  }
}

export { CreateComplaintService, CreateComplaintType };
