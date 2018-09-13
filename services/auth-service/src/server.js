import Hapi from 'hapi';
import Inert from 'inert';
import HapiPino from 'hapi-pino';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import config from 'src/config';
import { DBConnections } from 'src/database';
import MainComponent from 'src/components/MainComponent';
import routes from 'src/routes';

const server = Hapi.server({
  host: config.baseUrl,
  port: config.port
});

const initApp = (server) => {
  const mainComponent = new MainComponent();
  server.route(routes(mainComponent));
};

const initServer = async () => {

  //register plugins
  await server.register(Inert);
  await server.register(Vision);
  await server.register({
    plugin: HapiPino,
    options: {
      prettyPrint: true,
      logEvents: ['response']
    }
  });
  await server.register({
    plugin: HapiSwagger,
    options: {
      info: {
        title: 'Exam Documentation',
        version: '0.0.1',
      }
    }
  });

  await DBConnections.init();
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.file('src/public/index.html');
    }
  });
  initApp(server);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};


process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

initServer();
