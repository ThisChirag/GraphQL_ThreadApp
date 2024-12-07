import express, { query } from "express";
import cors from "cors";
const { expressMiddleware } = require("@apollo/server/express4"); // ** need to understand this...
import axios from "axios";
import { prismaClient } from "./db";
import createApolloGraphqlServer from "./graphql";



async function startServer() {
const PORT = 8000;
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} `);
  });
}

startServer();
