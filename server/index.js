const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const {expressMiddleware} = require('@apollo/server/express4')
const {ApolloServer} = require('@apollo/server');

async function startServer(){
    const app = express();
    const server = new ApolloServer({
        typeDefs:`
            type Todo {
                id: ID!,
                title: String!,
                complete: Boolean
            }
            
            type Query {
               getTodos: [Todo]
            }
        `
        ,
        resolvers:{
            Query:{
                getTodos: ()=> [{id: 1, title: "learning GraphQL", complete: false},

                ],
            }
        }
    });

    app.use(cors());
    app.use(bodyparser.json());

    await server.start();

    app.use('/graphql', expressMiddleware(server));
    app.listen(PORT=8000, ()=>{
        console.log(`Server is listening on ${PORT} `);
    });
}

startServer();