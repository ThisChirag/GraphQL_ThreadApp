"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const { expressMiddleware } = require("@apollo/server/express4");
const graphql_1 = __importDefault(require("./graphql"));
const user_1 = __importDefault(require("./services/user"));
async function startServer() {
    const PORT = 8000;
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/graphql", expressMiddleware(await (0, graphql_1.default)(), {
        context: async ({ req }) => {
            const token = req.headers.authorization;
            try {
                const user = user_1.default.decodeJWTToken(token);
                return { user };
            }
            catch (error) {
                throw new Error('token invalid/expired or not provided');
            }
        },
    }));
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT} `);
    });
}
startServer();
//# sourceMappingURL=index.js.map