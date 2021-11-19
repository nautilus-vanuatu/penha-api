import { ReviewComplaintService } from '../review.service';
import { prismaMock } from '../../../test/setup';
import { Status, ComplaintType } from '@prisma/client';
import { BadRequestError } from '@aonautilus/ticketingcommon';

const complaint = {
  id: 1,
  userId: 1,
  latitude: '41.00031',
  longitude: '9.33321',
  type: ComplaintType.ESGOTO,
  desc: 'Esgoto na praia',
  status: Status.REVISAO,
  createdAt: new Date(),
  updatedAt: new Date(),
}

it('review complaint successfully', async () => {
  const reviewComplaintService = new ReviewComplaintService();

  prismaMock.complaint.findUnique.mockResolvedValue({
    ...complaint,
  });

  prismaMock.complaint.update.mockResolvedValue({
    ...complaint,
    updatedAt: new Date(),
    status: Status.ATIVO,
  });

  const reviewedComplaint = await reviewComplaintService.execute({ id: complaint.id, status: 'ATIVO' });

  expect(reviewedComplaint.status).toEqual(Status.ATIVO);
});

it('complaint not waiting for review', async () => {
  const reviewComplaintService = new ReviewComplaintService();

  prismaMock.complaint.findUnique.mockResolvedValue({
    ...complaint,
    status: Status.ATIVO
  });

  await expect(reviewComplaintService.execute({ id: complaint.id, status: 'ATIVO' }))
  .rejects
  .toThrowError(new BadRequestError('Complaint not waiting for review'));
});

it('throws error complaint not found', async () => {
  const reviewComplaintService = new ReviewComplaintService();

  prismaMock.complaint.findUnique.mockResolvedValue(null);

  await expect(reviewComplaintService.execute({ id: complaint.id, status: 'ATIVO' }))
  .rejects
  .toThrowError(new BadRequestError('Complaint not found'));
});

it('throws error reviewing complaint', async () => {
  const reviewComplaintService = new ReviewComplaintService();

  prismaMock.complaint.findUnique.mockResolvedValue({
    ...complaint,
  });

  prismaMock.complaint.update.mockRejectedValue(new Error());

  await expect(reviewComplaintService.execute({ id: complaint.id, status: 'ATIVO' }))
  .rejects
  .toThrowError(new BadRequestError('Error reviewing complaint'));
});
