import mysql2 from 'mysql2';
import config from './config';

interface IDBConfig {
  [key: string]: {
      host: string;
      user: string;
      password: string;
      database: string;
  }
}

const dbConfig : IDBConfig = config.db;

const db = mysql2.createConnection(dbConfig[process.env.NODE_ENV || 'dev']).promise();

export default db;
