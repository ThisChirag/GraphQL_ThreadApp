import express, {Request} from "express";
import cors from "cors";
const { expressMiddleware } = require("@apollo/server/express4"); // ** need to understand this... why I used const instead of import...
import createApolloGraphqlServer from "./graphql";
import UserService from "./services/user";

async function startServer() {
  const PORT = 8000;
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphqlServer(), {
      context: async ({req}: {req:Request}) => {

        // @ts-ignore
          const token = req.headers.authorization;
          try{
            const user = UserService.decodeJWTToken(token as string )
            return {user};
          }catch(error){
            throw new Error('token invalid/expired or not providedg');
          }

      },
    })
  );

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} `);
  });
}

startServer();
