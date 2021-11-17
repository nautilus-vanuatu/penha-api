import { BadRequestError, NotFoundError } from '@aonautilus/ticketingcommon';
import { Complaint, Status } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

type UpdateComplaintType = {
  id: number;
}

class ResolveComplaintService {

  public async execute(dto: UpdateComplaintType): Promise<Complaint> {
    const complainExists = await prismaClient.complaint.findUnique({
      where: {
        id: dto.id,
      },
    });

    if (!complainExists) {
      throw new BadRequestError('Complaint not found');
    }

    if (complainExists.status !== Status.ATIVO) {
      throw new BadRequestError('Complaint not active');
    }

    try { 
      

      const resolvedComplaint = await prismaClient.complaint.update({
        where: {
          id: dto.id,
        },
        data: {
          status: Status.RESOLVIDO,
        }
      });

      return resolvedComplaint;
    } catch {
      throw new BadRequestError('Error resolving complaint');
    }
  }
}

export { ResolveComplaintService, UpdateComplaintType };
