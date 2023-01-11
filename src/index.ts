import http from "node:http";

const server: http.Server = http.createServer((req, res) => {
  console.log(req);
});

server.listen(4000,'localhost', 1, () => {
  console.log('listening port 4000');
});