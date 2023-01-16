import http from "node:http";
import { UserType } from "./modules/types.js";
import UsersData from "./modules/usersData.ts";

const usersData = new UsersData();

const server: http.Server = http.createServer((req, res) => {

  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.write('all is good');
    res.end();
  }
  
  const sendResponse = (code: number, header: [string, string], str: string) => {
    res.statusCode = code;
    res.setHeader(...header);
    res.write(str);
    res.end();
  };

  if (req.url.startsWith('/api/users')) {
    const idToChange = req.url.replace('/api/users/', '');
    switch(req.method) {
      case 'GET':
       if (req.url === '/api/users') {
        usersData.getUsers()
        .then((data: string) => {
          sendResponse(200, ['Content-type', 'text/json'],data);
        });
       } else {
        usersData.validateUuid(idToChange)
        .then((id: string) => {
          usersData.getUser(id)
          .then((data: UserType) => {
            console.log(data);
            sendResponse(200, ['Content-type', 'text/json'], JSON.stringify(data));
          })
          .catch((err: Error) => {
            sendResponse(404, ['Content-type', 'text/plain'], err.message);
          });
        })
        .catch((e: Error) => {
          sendResponse(400, ['Content-type', 'text/plain'], e.message);
        });
       }
       break;
      case 'POST':
        if (req.url === '/api/users' && req.headers['content-type'] === 'application/json') {
          let rawData = '';
          req.on('data', (chunk) => {
            rawData += chunk;
          });
          req.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);
              console.log(parsedData);
              usersData.createUser(parsedData)
                .then((data: UserType) => {
                  console.log(JSON.stringify(data));
                  sendResponse(201, ['Content-type', 'text/json'], JSON.stringify(data));
                })
                .catch((err: Error) => {
                  sendResponse(400, ['Content-type', 'text/plain'], err.message);
                  console.error('ERR ', err.message);
                });
            } catch (e) {
              sendResponse(400, ['Content-type', 'text/plain'], e.message);
              console.error('ERROR ', e.message);
            }
          });
        }
        break;
      case 'PUT':
        usersData.validateUuid(idToChange)
        .then((id: string) => {
          let rawData = '';
          req.on('data', (chunk) => {
            rawData += chunk;
          });
          req.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);
              console.log(rawData);
              console.log(parsedData);
              usersData.updateUser(id, parsedData)
                .then((data: UserType) => {
                  console.log(data);
                  sendResponse(200, ['Content-type', 'text/json'], JSON.stringify(data))
                })
                .catch ((e: Error) => sendResponse(400, ['Content-type', 'text/plain'], e.message));
            }
            catch (e) {
              sendResponse(400, ['Content-type', 'text/plain'], e.message);
            }
          })
        })
        .catch((e: Error) => {
          sendResponse(400, ['Content-type', 'text/plain'], e.message);
        });
        break;
      case 'DELETE':
        usersData.validateUuid(idToChange)
          .then((id: string) => {
            usersData.getUser(id)
              .then(() => {
                usersData.deleteUser(id)
                  .then((data: UserType) => {
                    console.log(data);
                    sendResponse(204, ['Content-type', 'text/plain'], `User ${id} is delited`)
                  })
              })
              .catch((err: Error) => {
                sendResponse(404, ['Content-type', 'text/plain'], err.message);
              })
          })
          .catch((err: Error) => {
            sendResponse(400, ['Content-type', 'text/plain'], err.message);
          });
          break;
    }
  } else {
    sendResponse(404, ['Content-type', 'text/plain'], 'url does not find');
  }
});

export default server;