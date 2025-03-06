import express from "express";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";


async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type User {
        id: ID!
        username: String!
        email: String!
        age: Int!
        phone: String!
        website: String!
        }
        type Todo {
        id: ID!
        todo: String!
        completed: Boolean!
        user: User
        }
        type Query {
        getTodos: [Todo] 
        getTodosById(id: ID!): Todo
        getAllUsers: [User]
        getUserById(id: ID!): User
        }
        `,
        resolvers:{
            Todo: {
                user : async (todo) => (await axios.get(`https://dummyjson.com/users/${todo.id}`)).data
            },
            Query : {getTodos: async () => (await axios.get('https://dummyjson.com/todos')).data.todos,
                    getTodosById: async (_, {id}) => (await axios.get(`https://dummyjson.com/todos/${id}`)).data,
                    getAllUsers: async () => (await axios.get("https://dummyjson.com/users")).data.users,
                    getUserById: async (_, {id}) => (await axios.get(`https://dummyjson.com/users/${id}`)).data,
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