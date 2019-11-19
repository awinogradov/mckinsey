import http from 'http';
import { seed } from './database';

let app = require('./server').default;

const server = http.createServer(app);

let currentApp = app;

(async () => {
  await seed().catch(err => console.error(err));

  server.listen(process.env.PORT || 3000, () => {
    console.log('🚀 Server started!');
  });
})();

if (module.hot) {
  console.log('✅ HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁 HMR Reloading `./server`...');

    try {
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}
