import { ResolveComplaintService } from '../resolve.service';
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
  status: Status.ATIVO,
  createdAt: new Date(),
  updatedAt: new Date(),
}

it('resolve complaint successfully', async () => {
  const resolveComplaintService = new ResolveComplaintService();

  prismaMock.complaint.findUnique.mockResolvedValue({
    ...complaint,
  });

  prismaMock.complaint.update.mockResolvedValue({
    ...complaint,
    updatedAt: new Date(),
    status: Status.RESOLVIDO,
  });

  const resolvedComplaint = await resolveComplaintService.execute({ id: complaint.id });

  expect(resolvedComplaint.status).toEqual(Status.RESOLVIDO);
});

it('complaint not active', async () => {
  const resolveComplaintService = new ResolveComplaintService();

  prismaMock.complaint.findUnique.mockResolvedValue({
    ...complaint,
    status: Status.REVISAO
  });

  await expect(resolveComplaintService.execute({ id: complaint.id }))
  .rejects
  .toThrowError(new BadRequestError('Complaint not active'));
});

it('throws error complaint not found', async () => {
  const resolveComplaintService = new ResolveComplaintService();

  prismaMock.complaint.findUnique.mockResolvedValue(null);

  await expect(resolveComplaintService.execute({ id: complaint.id }))
  .rejects
  .toThrowError(new BadRequestError('Complaint not found'));
});

it('throws error resolving complaint', async () => {
  const resolveComplaintService = new ResolveComplaintService();

  prismaMock.complaint.findUnique.mockResolvedValue({
    ...complaint,
  });

  prismaMock.complaint.update.mockRejectedValue(new Error());

  await expect(resolveComplaintService.execute({ id: complaint.id }))
  .rejects
  .toThrowError(new BadRequestError('Error resolving complaint'));
});
