import { ConnectionOptions } from "typeorm";
import path from "path";


const envConfig = require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
for (const k in envConfig) {
  process.env[k] = envConfig[k]
}


const config: ConnectionOptions = {
  type: "postgres",
  host: 'trumpet.db.elephantsql.com', //'trumpet.db.elephantsql.com', // process.env.DATABASE_HOSTNAME,
  port: 5432, // Number(process.env.DATABASE_PORT),
  username: 'oxebcjvf', // 'ffcjjshs', // process.env.DATABASE_USERNAME,
  password:  '7kmKJjn3ZTuStWo5r0nQibBELfVpKQ0I', // 'ZwaYIgG9RqwrG0NCP4gT3VodAn4GhHIe', // process.env.DATABASE_PASSWORD,
  database:  'oxebcjvf', // 'ffcjjshs', // process.env.DATABASE_NAME,
  entities: [`${__dirname  }/entity/**/*{.ts,.js}`],
  migrations: [
   
  ],
  synchronize: true,
  extra: {
    ssl: process.env.NODE_ENV === "production",
    rejectUnauthorized: true,

    // based on  https://node-postgres.com/api/pool
    // max connection pool size
    max: 12,
    keepAlive: true,
    // idleTimeoutMillis: 600000,

    // connection timeout
    connectionTimeoutMillis: 25000,
  },
  poolErrorHandler: (err: any) => {
    console.log("Database pool error: ", err.message);
    console.log("Database pool error details: ", JSON.stringify(err, null, 4));
  },
  // logging: process.env.NODE_ENV !== 'production'
};

console.log("Db connection was successfull");

export default config;
