import request from "supertest";
import server from "../src/server.ts";

const app = server;

describe('DELETE remove user', () => {
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
      .delete('/api/users/123')
    expect(response.status).toEqual(400);
  });
    
  it('responds on existing id', async () => {
    const response = await request(app)
      .delete('/api/users/a2910d1f-81b4-43e3-b503-852a87855b1c')
    expect(response.status).toEqual(404);
  });

  it('respond to delite user', async () => {
    const response = await request(app)
      .delete(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
    expect(response.status).toEqual(204);
  });

  it('responds on existing delited user in DB', async () => {
    const response = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
    expect(response.status).toEqual(404);
  });

  afterAll(() => {
    app.close()
  });
});

