# GraphQL Thread Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [GraphQL Overview](#graphql-overview)
  - [Why GraphQL?](#why-graphql)
  - [When to Use GraphQL?](#when-to-use-graphql)
  - [When Not to Use GraphQL?](#when-not-to-use-graphql)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker Configuration](#docker-configuration)
- [License](#license)

---

## Introduction
The **GraphQL Thread Application** is a very basic and simple backend project built to demonstrate the implementation of GraphQL with Apollo Server, Prisma, and Express.js. This application provides APIs to manage users and todos. This readme file also contains some useful info about GraphQL.

## Features
- 🚀 **GraphQL API** with Queries and Mutations.
- 🛠 **Prisma ORM** for database management.
- 🌐 **Mock data integration** using JSONPlaceholder.
- 🔒 **Secure API access** with JWT-based authentication.
- 🐳 **Dockerized PostgreSQL database** for streamlined development.
- ⚡ **Real-time capabilities** via GraphQL subscriptions.

## Tech Stack
- **Backend Framework**: Node.js with Express.js
- **GraphQL Server**: Apollo Server
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Development Tools**: TypeScript, Docker, and Nodemon

## GraphQL Overview
GraphQL is a query language for APIs and a runtime for executing those queries against your data. It enables clients to request only the data they need, making it highly efficient and flexible.

### Why GraphQL? ✨
1. **Efficient Data Fetching**: Clients can fetch multiple resources in a single request.
2. **Strong Typing**: Schema defines data types, ensuring API reliability.
3. **Versionless API**: Avoid breaking changes by evolving the schema instead of creating new endpoints.
4. **Real-time Functionality**: Easily supports subscriptions for real-time updates.

### When to Use GraphQL? 
- When your client needs precise control over the data it fetches.
- When working with complex relationships between data entities.
- When building applications with multiple frontends (e.g., mobile and web) consuming the same backend.
- For real-time applications needing subscriptions.

### When Not to Use GraphQL? 
- For simple, flat data models where REST can suffice.
- When caching is critical, as REST APIs work more naturally with HTTP caching.
- When your project lacks experienced developers familiar with GraphQL’s learning curve.
- If over-fetching is not a concern and REST endpoints already exist.

## Project Structure 🗂️
```
GraphQL_ThreadApp/
  |-- basics/
      |-- server/
          |-- index.js
          |-- package.json
  |-- thread-app-backend/
      |-- src/
          |-- graphql/
          |-- services/
          |-- db.ts
          |-- index.ts
      |-- prisma/
      |-- package.json
      |-- docker-compose.yml
  |-- README.md
```

## Setup and Installation 🛠️
### Prerequisites
- 🖥 Node.js (v16 or higher)
- 🐳 Docker (for PostgreSQL setup)
- pnpm (Preferred package manager)

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ThisChirag/GraphQL_ThreadApp.git
   cd GraphQL_ThreadApp
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Setup the database with Docker:
   ```bash
   docker-compose up -d
   ```

4. Apply Prisma migrations:
   ```bash
   pnpm prisma migrate dev
   ```

5. Start the backend server:
   ```bash
   pnpm dev
   ```

## Usage 🔗
The server exposes a GraphQL endpoint at:
```
http://localhost:8000/graphql
```

### API Endpoints
#### Queries
- `getTodos`: Fetch all todos.
- `getAllUsers`: Fetch all users.
- `getUser(id: ID!)`: Fetch a single user by ID.

#### Mutations
- `createUser(firstName: String!, lastName: String!, email: String!, password: String!): String`: Create a new user.

## Docker Configuration 🐳
This project includes a `docker-compose.yml` file for setting up a PostgreSQL database.

### Docker Services
- **Postgres Service**: 
  - **Image**: `postgres`
  - **Port**: `5432`

To start the services:
```bash
docker-compose up -d
```

To stop the services:
```bash
docker-compose down
```

## License 📜
This project is licensed under the MIT License. See the LICENSE file for more details.

---

Thank you for exploring the GraphQL Thread Application. Happy coding! 🎉

