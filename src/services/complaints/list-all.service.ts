import { Complaint } from '@prisma/client';
import { prismaClient } from '../../config/prisma.config';

class ListAllComplaints {
  public async execute(): Promise<Complaint[]> {
    const allComplaints = await prismaClient.complaint.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    });

    return allComplaints;
  }
}

export { ListAllComplaints };
