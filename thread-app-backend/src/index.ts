import express, { query } from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
const { expressMiddleware } = require("@apollo/server/express4"); // ** need to understand this...
import axios from "axios";
import { prismaClient } from "./db";

const PORT = 8000;

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type Query{
        hello: String
        say(name: String): String
        }

        type Mutation {
            createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
        }

        `,
    resolvers: {
      Query: {
        hello: () => `Hey there, i'm graphql server`,
        say: (_, { name }: { name: string }) => `Hey ${name}, How are you?`,
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prismaClient.user.create({
            data: {
              email,
              firstName,
              lastName,
              password,
              salt: 'random_salt',
            },
          });
          return true;
        },
      },
    },
  });

  app.use(cors());
  app.use(express.json());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} `);
  });
}

startServer();
