/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFromContainer, MetadataStorage } from 'class-validator';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';
import env from '../env';

const SwaggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  try {
    if (env.swagger.enabled) {
      const expressApp = settings.getData('express_server');

      const { validationMetadatas } = getFromContainer(MetadataStorage) as any;
      const schemas = validationMetadatasToSchemas(validationMetadatas) as any;

      const swaggerFile = routingControllersToSpec(
        getMetadataArgsStorage(),
        {
          routePrefix: env.app.routePrefix
        },
        {
          components: {
            schemas,
            securitySchemes: {
              bearerAuth: { type: 'http', scheme: 'bearer' }
            },
          },
        }
      );

      swaggerFile.info = {
        title: env.app.name,
        description: env.app.description,
        version: env.app.version,
      };

      swaggerFile.servers = [{ url: env.app.apiUrl, description: 'Acadia API Documentation' }];

      expressApp.use(
        env.swagger.route,
        (req: any, res: any, next: any) => next(),
        swaggerUi.serve,
        swaggerUi.setup(swaggerFile, { explorer: true })
      );

      console.log(`Swagger running on ${env.app.apiUrl + env.swagger.route}`);
    } else {
      console.log('Swagger disabled');
    }
  } catch (e) {
    console.error('Swagger Error ', e);
  }
};

export default SwaggerLoader;
