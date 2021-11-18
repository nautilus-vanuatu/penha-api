import { Status, ComplaintType } from '@prisma/client';
import { prismaMock } from '../../../test/setup';
import { ListAllComplaints } from '../list-all.service';

const complaintList = [
  {
    id: 1,
    latitude: '41.00031',
    longitude: '9.33321',
    type: ComplaintType.ESGOTO,
    desc: 'Esgoto na praia',
    status: Status.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    latitude: '25.44321',
    longitude: '9.44334',
    type: ComplaintType.ESGOTO,
    desc: 'Esgoto na praia',
    status: Status.ATIVO,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

it('return a complaint list', async () => {
  const listAllService = new ListAllComplaints();

  prismaMock.complaint.findMany.mockResolvedValue(complaintList);

  const listAllComplaints = await listAllService.execute();

  expect(listAllComplaints).toEqual(complaintList);
});
