"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const { expressMiddleware } = require("@apollo/server/express4");
const graphql_1 = __importDefault(require("./graphql"));
async function startServer() {
    const PORT = 8000;
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/graphql", expressMiddleware(await (0, graphql_1.default)()));
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT} `);
    });
}
startServer();
//# sourceMappingURL=index.js.map