"use strict";
exports.__esModule = true;
var config = {
    type: "postgres",
    host: 'trumpet.db.elephantsql.com',
    port: 5432,
    username: 'ffcjjshs',
    password: 'ZwaYIgG9RqwrG0NCP4gT3VodAn4GhHIe',
    database: 'ffcjjshs',
    entities: [__dirname + "/entity/**/*{.ts,.js}"],
    migrations: [],
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
        connectionTimeoutMillis: 25000
    },
    poolErrorHandler: function (err) {
        console.log("Database pool error: ", err.message);
        console.log("Database pool error details: ", JSON.stringify(err, null, 4));
    }
};
console.log("Db connection was successfull");
exports["default"] = config;
//# sourceMappingURL=ormconfig.js.map