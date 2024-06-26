const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

// set token secret and expiration date
const secret = process.env.JWT_SECRET || 'default_secret'; // Use environment variable
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log('No token found');
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log('Token valid:', data);
    } catch (err) {
      console.log('Invalid token:', err.message);
      throw new GraphQLError('Invalid token', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

