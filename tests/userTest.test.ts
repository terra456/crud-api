import request from "supertest";
import server from "../src/server.ts";

const app = server;

describe('Work with users in DB', () => {
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
  
  it('change name with new data', async () => {
    const response = await request(app)
    .put(`/api/users/${user.id}`)
    .send({name:"john"})
    .set('Accept', 'application/json')
    expect(response.status).toEqual(200);
  });
  
  it('get user and match name', async () => {
    const response = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
    expect(response.status).toEqual(200);
    expect(response.text).toMatch(/john/);
  });

  it('delite user', async () => {
    const response = await request(app)
      .delete(`/api/users/${user.id}`)
      .set('Accept', 'application/json')
    expect(response.status).toEqual(204);
  });

  it('users are empty', async () => {
    const response = await request(app)
      .get(`/api/users`)
      .set('Accept', 'application/json')
    expect(response.status).toEqual(200);
    expect(JSON.parse(response.text).length).toBe(0);
  });

  afterAll(() => {
    app.close()
  });
});

