import { BadRequestError } from '@aonautilus/ticketingcommon';
import { Complaint, Status, ComplaintType, User } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

type CreateComplaintType = {
  userId: number;
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
    const userValid = await prismaClient.user.findUnique({
      where: {
        id: Number(dto.userId),
      }
    });

    if (!userValid) {
      throw new BadRequestError('User not found');
    }

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
          userId: Number(dto.userId),
          latitude: dto.latitude,
          longitude: dto.longitude,
          desc: dto.desc,
          status: Status.REVISAO,
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
