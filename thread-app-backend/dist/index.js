"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const db_1 = require("./db");
const PORT = 8000;
async function startServer() {
    const app = (0, express_1.default)();
    const server = new server_1.ApolloServer({
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
                say: (_, { name }) => `Hey ${name}, How are you?`,
            },
            Mutation: {
                createUser: async (_, { firstName, lastName, email, password, }) => {
                    await db_1.prismaClient.user.create({
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
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    await server.start();
    app.use("/graphql", expressMiddleware(server));
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT} `);
    });
}
startServer();
//# sourceMappingURL=index.js.map