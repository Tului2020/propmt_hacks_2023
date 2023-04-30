import { bootstrapMicroframework } from 'microframework-w3tec';
import ExpressLoader from './loaders/ExpressLoader';
import SwaggerLoader from './loaders/SwaggerLoader';

bootstrapMicroframework({
  loaders: [
    ExpressLoader,
    SwaggerLoader,
  ]
})
  .then(() => console.log('API has started'))
  .catch((e) => {
    console.log('<-------------------  error ------------------->');
    console.log(e);
    console.log('<-------------------  error ------------------->');
  });
