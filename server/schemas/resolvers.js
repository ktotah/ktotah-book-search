const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return User.find().populate("savedBooks");
    },
    getUserByUsername: async (parent, { username }) => {
      return User.findOne({ username }).populate("savedBooks");
    },
    getCurrentUser: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate("savedBooks");
      }
      throw new AuthenticationError("Authentication required!");
    },
  },
  Mutation: {
    registerUser: async (parent, { username, email, password }) => {
      const newUser = await User.create({ username, email, password });
      const token = signToken(newUser);
      return { token, user: newUser };
    },
    authenticateUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email!");
      }
      const validPassword = await user.isCorrectPassword(password);
      if (!validPassword) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);
      return { token, user };
    },
    addBook: async (parent, { bookData }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("Authentication required!");
    },
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError("Authentication required!");
    },
  },
};

module.exports = resolvers;
