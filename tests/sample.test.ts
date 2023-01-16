import request from "supertest";
import server from "../src/server.ts";

const app = server;

describe('GET /users', () => {
  it('responds to get all users with correct status', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
    expect(response.status).toEqual(200);
  });

  it('respons on incorrect adress', async () => {
    const response = await request(app)
      .get('/api/kfjepf')
      .set('Accept', 'application/json')
    expect(response.status).toEqual(404);
  });

  afterAll(() => {
    app.close()
  });
});

