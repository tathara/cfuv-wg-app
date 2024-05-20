import { DataSource, DataSourceOptions } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../config';

export const dbConnectionOptions: DataSourceOptions = {
  type: 'postgres',

  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,

  entities: ['dist/db/entities/*{.ts,.js}'],
  subscribers: ['dist/db/subscribers/*{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',

  migrationsRun: true,
  synchronize: false,
};

export const dataSource = new DataSource(dbConnectionOptions);
