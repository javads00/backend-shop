import express from 'express';
import { dbRefresh } from '../loaders/databaseLoader';
import { serverConfig } from '../loaders';
beforeAll(async () => {
  const app = express();

  await serverConfig(app);

  await dbRefresh();
});

afterAll(async () => {
  await dbRefresh();
});
