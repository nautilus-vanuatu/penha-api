import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { DeepMockProxy } from 'jest-mock-extended/lib/cjs/Mock';

import { prismaClient } from '../config/prisma.config';
import { app } from '../app';

jest.mock('../config/prisma.config', () => ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>(),
}));

beforeAll(async () => {
  process.env.JWT_KEY = 'asdhjasdhas';
});

beforeEach(async () => {
  jest.clearAllMocks();
  mockReset(prismaMock);
});

afterAll(async () => {
});

export const prismaMock = prismaClient as unknown as DeepMockProxy<PrismaClient>
