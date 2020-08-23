import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";
import express from "express";
import {Request, Response} from "express";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    const migrator = orm.getMigrator();
    await migrator.createMigration("./dist/migrations");
    await migrator.up();
    // SQL
    const post = orm.em.create(Post, {title: "my first post" });
    await orm.em.persistAndFlush(post);
    console.log("========== sql 2 =========");
    // Does not work
    // await orm.em.nativeInsert(Post, {title: "My first post 2"})
    // await migrator.down({to: 0});
    // await orm.close(true);
    /*  EXPRESS */
    const app = express();
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ HelloResolver ], 
            validate: false,
        }),
        context: () => ({em : orm.em})
    });

    // Create graphql server
    apolloServer.applyMiddleware({app});

    app.get("/", (_: Request, res:Response) => {
       res.send('Test hello'); 
    });

    app.listen(4000, () => {
        console.log('Server started on localhost:4000')
    });


};



main().catch(
    err => { console.error(err); }
);