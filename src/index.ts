import http from "node:http";
import { UserType } from "./modules/types.js";
import UsersData from "./modules/usersData.ts";

const usersData = new UsersData();

const server: http.Server = http.createServer((req, res) => {
  console.log(req.url, req.headers['content-type']);

  if (req.url.startsWith('/api/users')) {
    
    switch(req.method) {
      case 'GET':
       if (req.url === '/api/users') {
        // console.log(usersData.getUsers);
        usersData.getUsers()
        .then((data: string) => {
            res.setHeader('Content-type', 'text/json');
            res.write(data);
            res.end();
        });
       } else {
        const newId = req.url.replace('/api/users/', '');
        usersData.getUser(newId)
        .then((data: UserType) => {
          console.log(data);
          res.statusCode = 201;
          res.setHeader('Content-type', 'text/json');
          res.write(JSON.stringify(data));
          res.end();
        })
        .catch((e: Error) => {
          console.log(e.message);
          res.statusCode = 404;
          res.write(e.message);
          res.end();
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
                  res.statusCode = 201;
                  res.setHeader('Content-type', 'text/json');
                  res.write(JSON.stringify(data));
                  res.end();
                })
                .catch((err: Error) => {
                  res.statusCode = 400;
                  res.write(err.message);
                  res.end();
                  console.error('ERR ', err.message);
                });
            } catch (e) {
              res.statusCode = 400;
              res.write(e.message);
              res.end();
              console.error('ERROR ', e.message);
            }
          });
        }
        // res.setHeader('Content-type', 'text/json');
        // res.write('ehfgoeijfqwkdf[');
        // res.end();
        // req.setEncoding('utf8');
        
        
        
        // usersData.createUser({});
        break;
    }
  }
});

server.listen(4000,'localhost', 1, () => {
  console.log('listening port 4000');
});