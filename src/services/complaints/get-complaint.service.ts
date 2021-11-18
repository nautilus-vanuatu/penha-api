import { Complaint } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

class GetComplaintService {
  public async execute(complaintId: number): Promise<Complaint | null> {
    const complaint = await prismaClient.complaint.findUnique({
      where: {
        id: complaintId
      }
    });

    return complaint;
  }
}

export { GetComplaintService };
