import express, { query } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
const {expressMiddleware} = require("@apollo/server/express4") // ** need to understand this...
import axios from 'axios';

const PORT = 8000;

async function startServer(){
    const app = express();
    const server = new ApolloServer({
        typeDefs:`
        type Query{
        hello: String
        say(name: String): String
        }
        `
        ,
        resolvers:{
            Query: {
                hello: ()=> `Hey there, i'm graphql server`,
                say: (_, {name}: {name:String}) => `Hey ${name}, How are you?`
            }
        }
    });

    app.use(cors());
    app.use(express.json());

    await server.start();

    app.use('/graphql', expressMiddleware(server));
    
    app.listen(PORT, ()=>{
        console.log(`Server is listening on ${PORT} `);
    });
}

startServer();

