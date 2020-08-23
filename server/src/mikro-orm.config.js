"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var Post_1 = require("./entities/Post");
var path = require("path");
// const connection: Partial<MikroORMOptions> = {
//     entities: [Post],
//     host: '127.0.0.1',
//     dbName: 'mydb',
//     type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
//     debug: !__prod__,
// }
console.log("MYPATH:" + __dirname);
exports.default = {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.js$/,
        emit: 'js'
    },
    entities: [Post_1.Post],
    // host: '127.0.0.1',
    dbName: 'mydb',
    user: '',
    password: '',
    type: 'postgresql',
    debug: !constants_1.__prod__,
};
// 
