// src/data-source.ts
import { DataSource } from 'typeorm';
import { Agenda } from './Entity/Agenda';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'bd_ventas',
  synchronize: true,
  entities: [Agenda],
});
