require('dotenv').config({ path: '../.env' });
console.log('MongoDB URI:', process.env.MONGODB_URI);
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3002;
const app = express();

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enable introspection
  });

  await server.start();

  app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://ktotah-book-search-frontend.onrender.com' : '*'
  }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(bodyParser.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  console.log('Connecting to MongoDB URI:', process.env.MONGODB_URI);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Successfully connected to MongoDB');
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
    });
};

startApolloServer();
