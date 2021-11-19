import { CreateComplaintService } from '../create.service';
import { prismaMock } from '../../../test/setup';
import { Status, ComplaintType } from '@prisma/client';
import { BadRequestError } from '@aonautilus/ticketingcommon';

const images = [
  {
    fieldname: 'image',
    originalname: 'icons8-toda-a-mão-100.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: 1686,
    destination: '/home/daniele/dev/penha-api/upload',
    filename: 'cb5822cc-ff49-4472-9d7c-260774d7dddd.png',
    path: '/home/daniele/dev/penha-api/upload/cb5822cc-ff49-4472-9d7c-260774d7dddd.png',
  },
  {
    fieldname: 'image',
    originalname: 'icons8-toda-a-mão-100.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: 1686,
    destination: '/home/daniele/dev/penha-api/upload',
    filename: 'cb5822cc-ff49-4472-9d7c-260774d7dddd.png',
    path: '/home/daniele/dev/penha-api/upload/cb5822cc-ff49-4472-9d7c-260774d7dddd.png',
  }
]

const user = {
  id: 1,
  email: 'johndoe@gmail.com',
  name: 'John Doe',
};

const complaint = {
  userId: user.id,
  latitude: '41.00031',
  longitude: '9.33321',
  type: ComplaintType.ESGOTO,
  desc: 'Esgoto na praia',
  images: images as Express.Multer.File[],
}

it('create a new complaint successfully', async () => {
  const createComplaintService = new CreateComplaintService();

  prismaMock.complaint.create.mockResolvedValue({
    id: 1,
    ...complaint,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: Status.ATIVO,
  });

  prismaMock.user.findUnique.mockResolvedValue(user);

  const newComplaint = await createComplaintService.execute(complaint);

  expect(newComplaint.latitude).toEqual(complaint.latitude);
  expect(newComplaint.longitude).toEqual(complaint.longitude);
  expect(newComplaint.type).toEqual(complaint.type);
  expect(newComplaint.desc).toEqual(complaint.desc);
  expect(newComplaint.status).toEqual(Status.ATIVO);
});

it('user not found', async () => {
  const createComplaintService = new CreateComplaintService();

  prismaMock.complaint.create.mockResolvedValue({
    id: 1,
    ...complaint,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: Status.ATIVO,
  });

  prismaMock.user.findUnique.mockResolvedValue(null);

  await expect(createComplaintService.execute(complaint))
  .rejects
  .toThrowError(new BadRequestError('User not found'));
});

it('generates BadRequestError when failed to create new complaint', async () => {
  const createComplaintService = new CreateComplaintService();

  const complaint = {
    latitude: '41.00031',
    longitude: '9.33321',
    type: ComplaintType.ESGOTO,
    desc: 'Esgoto na praia',
    userId: user.id,
  }

  prismaMock.user.findUnique.mockResolvedValue(user);

  prismaMock.complaint.create.mockRejectedValue(new Error());

  await expect(createComplaintService.execute(complaint))
  .rejects
  .toThrowError(new BadRequestError('Error creating complaint'));
});
