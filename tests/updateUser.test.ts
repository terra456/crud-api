import request from "supertest";
import server from "../src/server.ts";

const app = server;

describe('POST update user', () => {
  let user;
  it('create new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Manny', age: 2, hobbies: 'one, two' })
      .set('Accept', 'application/json')
    expect(response.status).toEqual(201);
    user = JSON.parse(response.text);
  });

  it('responds on incorrect id', async () => {
    const response = await request(app)
      .get('/api/users/123')
      .send({name:"john"})
      .set('Accept', 'application/json')
    expect(response.status).toEqual(400);
  });
    
  it('responds on existing id', async () => {
    const response = await request(app)
      .get('/api/users/a2910d1f-81b4-43e3-b503-852a87855b1c')
      .send({name:"john"})
      .set('Accept', 'application/json')
    expect(response.status).toEqual(404);
  });

  it('respond to change with new data', async () => {
    const response = await request(app)
      .put(`/api/users/${user.id}`)
      .send({name:"john"})
      .set('Accept', 'application/json')
    expect(response.status).toEqual(200);
    expect(response.text).toMatch(/john/);
  });

  it('respond new data in the DB', async () => {
    const response = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
    expect(response.status).toEqual(200);
    expect(response.text).toMatch(/john/);
  });

  afterAll(() => {
    app.close()
  });
});

