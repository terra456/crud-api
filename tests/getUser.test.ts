import request from "supertest";
import server from "../src/server.ts";

const app = server;

describe('GET users', () => {
  let user;
  it('type of user list is array', async () => {
    const response = await request(app)
      .get(`/api/users`)
      .set('Accept', 'application/json')
    expect(response.status).toEqual(200);
    expect(Array.isArray(JSON.parse(response.text))).toBe(true);
  });

  it('create new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Manny', age: 2, hobbies: 'one, two' })
      .set('Accept', 'application/json')
    expect(response.status).toEqual(201);
    user = JSON.parse(response.text);
  });

  it('there is one element in users', async () => {
    const response = await request(app)
      .get(`/api/users`)
      .set('Accept', 'application/json')
    expect(response.status).toEqual(200);
    expect(JSON.parse(response.text).length).toBe(1);
  });

  it('get user with exist id responds with correct status', async () => {
    const response = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
    expect(response.status).toEqual(200);
  });

  it('incorrect UUID responds with correct status', async () => {
    const response = await request(app)
      .get('/api/users/123')
      .set('Accept', 'application/json')
    expect(response.status).toEqual(400);
  });

  it('incorrect id responds with correct status', async () => {
    const response = await request(app)
      .get('/api/users/a2910d1f-81b4-43e3-b503-852a87855b1c')
      .set('Accept', 'application/json')
    expect(response.status).toEqual(404);
  });

  afterAll(() => {
    app.close()
  });
});

