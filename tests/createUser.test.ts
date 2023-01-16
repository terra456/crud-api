import request from "supertest";
import server from "../src/server.ts";

const app = server;

describe('POST new user', () => {
  let id: string;
  it('responds with correct status', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Manny', age: 2, hobbies: 'one, two' })
      .set('Accept', 'application/json')
    expect(response.status).toEqual(201);
    id = JSON.parse(response.text).id;
  });

  it('respond with new id', async () => {
    const response = await request(app)
      .get(`/api/users/${id}`)
      .set('Accept', 'application/json')
    expect(response.status).toEqual(200);
    expect(response.text).toMatch(/Manny/);
  });

  afterAll(() => {
    app.close()
  });
});

