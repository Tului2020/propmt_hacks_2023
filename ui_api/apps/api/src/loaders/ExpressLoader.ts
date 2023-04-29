import { createExpressServer } from 'routing-controllers';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { Application } from 'express';
import controllers from './../controllers/index';
import { CorsOptions } from 'cors';
import env from '../env';

const { apiPort, routePrefix, appUrl } = env.app;
const cors: CorsOptions = {
  origin: [appUrl]
};

const ExpressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings) => {
  try {
    const expressApp: Application = createExpressServer({
      cors,
      classTransformer: true,
      validation: {
        whitelist: true
      },
      defaultErrorHandler: false,
      routePrefix,
      controllers,
    });

    expressApp.listen(apiPort);
    settings.setData('express_server', expressApp);
    console.log(`API has started on port ${apiPort}`);
  } catch (e) {
    console.error(`API Error ${e}`);
  }
};

export default ExpressLoader;
