import server from "./server.ts";


server.listen(4000,'localhost', 1, () => {
  console.log('listening port 4000');
});