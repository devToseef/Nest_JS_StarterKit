import { Env } from './env';
export default () => ({
  database: {
    type: 'postgres',
    synchronize: true,
    loggin: 'error',
    host: Env.fetch('DB_HOST'),
    database: Env.fetch('DB_DATABASE'),
    username: Env.fetch('DB_USERNAME'),
    password: Env.fetch('DB_PASSWORD'),
    port: parseInt(Env.fetch('DB_PORT')),
    entities: ['src/**/*.entity{.ts,.js}'],
  },
});
