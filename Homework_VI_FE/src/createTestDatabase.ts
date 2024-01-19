import mysql2 from 'mysql2';
import path from 'path';
import fs from 'fs';
import config from './config';

const dbConfig = config.db.test;

const sqlFilePath = path.join(__dirname, '../sql/test.sql');
const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8').toString();
const db = mysql2.createConnection(dbConfig).promise();

const statements = sqlContent.split(/;\s*$/m);

async function runQuery(sql: string) {
  try {
    await db.query(sql);
  } catch (error) {
    console.log('Error', error);
  }
}

async function run() {
  try {
    await db.beginTransaction();
    for (const statement of statements) {
      if (statement.trim().length > 0) {
        await runQuery(statement);
      }
    }
    await db.commit();
    console.log('Database created and seeded.');
  } catch (error) {
    console.log(error);
    await db.rollback();
  } finally {
    await db.end();
  }
}

run();