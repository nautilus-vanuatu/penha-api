import { BadRequestError } from '@aonautilus/ticketingcommon';
import { Complaint, Status } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

type ReviewComplaintType = {
  id: number;
  status: string;
}

class ReviewComplaintService {
  public async execute(dto: ReviewComplaintType): Promise<Complaint> {
    const complainExists = await prismaClient.complaint.findUnique({
      where: {
        id: dto.id,
      },
    });

    if (!complainExists) {
      throw new BadRequestError('Complaint not found');
    }

    if (complainExists.status !== Status.REVISAO) {
      throw new BadRequestError('Complaint not waiting for review');
    }

    try { 
      const resolvedComplaint = await prismaClient.complaint.update({
        where: {
          id: dto.id,
        },
        data: {
          status: dto.status as Status,
        }
      });

      return resolvedComplaint;
    } catch {
      throw new BadRequestError('Error reviewing complaint');
    }
  }
}

export { ReviewComplaintService, ReviewComplaintType };
