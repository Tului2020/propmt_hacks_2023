import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
const stringEnvVar = (name: string) => process.env[name];
const boolEnvVar = (name: string) => stringEnvVar(name) === 'true';
const intEnvVar = (name: string) => +stringEnvVar(name);

const env = {
  jwtSignature: stringEnvVar('JWT_SIGNATURE') || 'jwtSignature',
  jwtExpireIn: intEnvVar('JWT_EXPIRE_IN') || 3600,
  app: {
    name: 'Hotline',
    description: 'PisOpsHotline',
    version: '1.0.0',
    apiUrl: stringEnvVar('API_URL') || 'http://localhost:3333',
    apiPort: stringEnvVar('API_PORT') || 3333,
    appUrl: stringEnvVar('APP_URL') || 'http://localhost:4200',
    routePrefix: 'api'
  },
  redis: {
    socket: {
      host: stringEnvVar('REDIS_HOSTNAME') || 'redis',
    },
    database: intEnvVar('REDIS_DATABASE') || 0,
    password: stringEnvVar('REDIS_PASSWORD') || 'password',
    username: stringEnvVar('REDIS_USER') || 'default'
  },
  database: {
    port: intEnvVar('TYPEORM_DB_PORT') || 5432,
    username: stringEnvVar('POSTGRES_USER') || 'reachuser',
    password: stringEnvVar('POSTGRES_PASSWORD') || 'pepperoni',
    database: stringEnvVar('POSTGRES_DB') || 'reachdb',
    host: stringEnvVar('TYPEORM_DB_HOST') || 'database',
  },
  s3: {
    credentials: {
      accessKeyId: stringEnvVar('S3_ACCESS_KEY_ID'),
      secretAccessKey: stringEnvVar('S3_SECRET_ACCESS_KEY'),
      region: stringEnvVar('S3_REGION'),
    },
    Bucket: stringEnvVar('S3_BUCKET')
  },
  swagger: {
    enabled: boolEnvVar('SWAGGER_ENABLED'),
    route: stringEnvVar('SWAGGER_ROUTE') || '/docs',
    username: stringEnvVar('SWAGGER_USERNAME') || 'admin',
    password: stringEnvVar('SWAGGER_PASSWORD') || 'password'
  },
  twilio: {
    apiKey: stringEnvVar('TWILIO_API_KEY'),
    fromEmail: stringEnvVar('TWILIO_FROM_EMAIL'),
    devToEmail: stringEnvVar('TWILIO_DEV_EMAIL'),
    sid: stringEnvVar('TWILIO_SID'),
    authToken: stringEnvVar('TWILIO_AUTH_TOKEN'),
    fromNumber: stringEnvVar('TWILIO_FROM_NUMBER')
  }
};

export default env;
