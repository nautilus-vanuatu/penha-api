import { Status, ComplaintType } from '@prisma/client';
import { prismaMock } from '../../../test/setup';
import { GetComplaintService } from '../get-complaint.service';

const user = {
  id: 1,
  email: 'johndoe@gmail.com',
  name: 'John Doe',
};

const complaint = {
  id: 1,
  userId: user.id,
  latitude: '41.00031',
  longitude: '9.33321',
  type: ComplaintType.ESGOTO,
  desc: 'Esgoto na praia',
  status: Status.ATIVO,
  createdAt: new Date(),
  updatedAt: new Date(),
};

it('return a complaint successfully', async () => {
  const getComplaintService = new GetComplaintService();

  prismaMock.complaint.findUnique.mockResolvedValue(complaint);

  const getComplaint = await getComplaintService.execute(complaint.id);

  expect(getComplaint).toEqual(complaint);
});

it('complaint not found', async () => {
  const getComplaintService = new GetComplaintService();

  prismaMock.complaint.findUnique.mockResolvedValue(null);

  const getComplaint = await getComplaintService.execute(122);

  expect(getComplaint).toEqual(null);
});
