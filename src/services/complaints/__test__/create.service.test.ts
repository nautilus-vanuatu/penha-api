import { CreateComplaintService } from '../create.service';
import { prismaMock } from '../../../test/setup';
import { Status, ComplaintType } from '@prisma/client';
import { BadRequestError } from '@aonautilus/ticketingcommon';

it('create a new complaint successfully', async () => {
  const createComplaintService = new CreateComplaintService();

  const complaint = {
    latitude: '41.00031',
    longitude: '9.33321',
    type: ComplaintType.ESGOTO,
    desc: 'Esgoto na praia',
  }

  prismaMock.complaint.create.mockResolvedValue({
    id: 1,
    ...complaint,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: Status.ATIVO,
  });

  const newComplaint = await createComplaintService.execute(complaint);

  expect(newComplaint.latitude).toEqual(complaint.latitude);
  expect(newComplaint.longitude).toEqual(complaint.longitude);
  expect(newComplaint.type).toEqual(complaint.type);
  expect(newComplaint.desc).toEqual(complaint.desc);
  expect(newComplaint.status).toEqual(Status.ATIVO);
});

it('generates BadRequestError when failed to create new complaint', async () => {
  const createComplaintService = new CreateComplaintService();

  const complaint = {
    latitude: '41.00031',
    longitude: '9.33321',
    type: ComplaintType.ESGOTO,
    desc: 'Esgoto na praia',
  }

  prismaMock.complaint.create.mockRejectedValue(new Error());

  await expect(createComplaintService.execute(complaint))
  .rejects
  .toThrowError(new BadRequestError('Error creating complaint'));
});
