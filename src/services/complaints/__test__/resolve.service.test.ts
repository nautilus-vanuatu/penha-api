import { ResolveComplaintService } from '../resolve.service';
import { prismaMock } from '../../../test/setup';
import { Status, ComplaintType } from '@prisma/client';
import { BadRequestError } from '@aonautilus/ticketingcommon';

const complaint = {
  id: 1,
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

it('throws error complaint not found', async () => {
  const resolveComplaintService = new ResolveComplaintService();

  prismaMock.complaint.findUnique.mockResolvedValue(null);

  await expect(resolveComplaintService.execute({ id: complaint.id }))
  .rejects
  .toThrowError(new BadRequestError('Complaint not found'));
});

// it('generates BadRequestError when failed to create new complaint', async () => {
//   const createComplaintService = new CreateComplaintService();

//   const complaint = {
//     latitude: '41.00031',
//     longitude: '9.33321',
//     type: ComplaintType.ESGOTO,
//     desc: 'Esgoto na praia',
//   }

//   prismaMock.complaint.create.mockRejectedValue(new Error());

//   await expect(createComplaintService.execute(complaint))
//   .rejects
//   .toThrowError(new BadRequestError('Error creating complaint'));
// });
