import http from "node:http";
import { UserType } from "./modules/types.js";
import UsersData from "./modules/usersData.ts";

const usersData = new UsersData();

const server: http.Server = http.createServer((req, res) => {
  console.log(req.url, req.headers['content-type']);

  if (req.url.startsWith('/api/users')) {
    const sendResponse = (code: number, header: [string, string], str: string) => {
      res.statusCode = code;
      res.setHeader(...header);
      res.write(str);
      res.end();
    };
    switch(req.method) {
      case 'GET':
       if (req.url === '/api/users') {
        usersData.getUsers()
        .then((data: string) => {
          sendResponse(200, ['Content-type', 'text/json'],data);
        });
       } else {
        const newId = req.url.replace('/api/users/', '');
        usersData.validateUuid(newId)
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
    }
  }
});

server.listen(4000,'localhost', 1, () => {
  console.log('listening port 4000');
});