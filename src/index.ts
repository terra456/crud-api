import * as dotenv from 'dotenv';
import server from './server.ts';

dotenv.config();
const port = process.env.PORT;

server.listen(port,'localhost', ()=> {
  console.log(`Server is started on ${port} port`);
});