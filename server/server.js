import express from "express";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";


async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type Todo {
        id: ID!
        title: String!
        completed: Boolean!
        }
        type Query {
        getTodos: [Todo] 
        }
        `,
        resolvers:{
            Query : {
                getTodos: () => [{id: 1, title: "nnnn", completed: false}]
            }
        }
    })

    app.use(cors());
    app.use(bodyParser.json());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(4003, ()=>{
        console.log("server started on http://localhost:4003/graphql");   
    })
}

startServer();