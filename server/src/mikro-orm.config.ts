import { __prod__ } from './constants'
import { Post } from './entities/Post';
import { MikroORM } from '@mikro-orm/core';
import * as path from 'path';

// const connection: Partial<MikroORMOptions> = {
//     entities: [Post],
//     host: '127.0.0.1',
//     dbName: 'mydb',
//     type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
//     debug: !__prod__,
// }

console.log("MYPATH:" + __dirname)
export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.js$/,
        emit: 'js'
    },
    entities: [Post],
    // host: '127.0.0.1',
    dbName: 'mydb',
    user:'',
    password:'',
    type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];

// 