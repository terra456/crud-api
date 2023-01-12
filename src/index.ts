import http from "node:http";
import UsersData from "./modules/usersData.ts";

const usersData = new UsersData();

const server: http.Server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if (req.url.startsWith('/api/users')) {
    switch(req.method) {
      case 'GET':
       if (req.url == '/api/users') {
        // console.log(usersData.getUsers);
        usersData.getUsers()
        .then((data: string) => {
            res.setHeader('Content-type', 'text/json');
            res.write(data);
            res.end();
        });
       }
       break;
      case 'POST':
        usersData.createUser({});
        break;
    }
  }
});

server.listen(4000,'localhost', 1, () => {
  console.log('listening port 4000');
});