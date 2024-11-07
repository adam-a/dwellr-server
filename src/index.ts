import server from './app';
import env from './environment';

const port = parseInt(env.PORT);

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
