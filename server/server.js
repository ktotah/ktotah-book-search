require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/connection");
const routes = require("./routes_backup");
const mongoose = require('mongoose');
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");

const PORT = process.env.PORT || 3002;
const app = express();

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(bodyParser.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  app.use(routes);

  // Define the /save-cache endpoint
  app.post("/save-cache", (req, res) => {
    const cacheData = req.body;
    // Save the cache data to your database or handle it as needed
    console.log("Received cache data:", cacheData);

    // Respond to the client
    res.status(200).send("Cache data received");
  });

  // Serve static files from the React app
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  } else {
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
