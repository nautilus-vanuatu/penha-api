import { BadRequestError } from '@aonautilus/ticketingcommon';
import { Complaint, Status, ComplaintType } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

type CreateComplaintType = {
  type: string;
  latitude: string;
  longitude: string;
  desc?: string;
}

class CreateComplaintService {

  public async execute(dto: CreateComplaintType): Promise<Complaint> {
    try { 
      const newComplaint = await prismaClient.complaint.create({
        data: {
          latitude: dto.latitude,
          longitude: dto.longitude,
          desc: dto.desc,
          status: Status.ATIVO,
          type: dto.type as ComplaintType,
        }
      });

      return newComplaint;
    } catch {
      throw new BadRequestError('Error creating complaint');
    }
  }
}

export { CreateComplaintService, CreateComplaintType };
