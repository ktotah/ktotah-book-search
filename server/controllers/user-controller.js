// Import user model
const { User } = require('../models');
// Import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // Retrieve a single user by either their id or username
  async getSingleUser({ user = null, params }, res) {
    try {
      console.log("getSingleUser called with user:", user, "params:", params);
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      });

      if (!foundUser) {
        return res.status(400).json({ message: 'User not found!' });
      }

      res.json(foundUser);
    } catch (err) {
      console.error("Error retrieving user:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Create a user, sign a token, and send it back
  async createUser({ body }, res) {
    console.log("createUser called with body:", body);
    try {
      const user = await User.create(body);

      if (!user) {
        return res.status(400).json({ message: 'Unable to create user!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Login a user, sign a token, and send it back
  async login({ body }, res) {
    console.log("login called with body:", body);
    try {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
      if (!user) {
        return res.status(400).json({ message: 'User not found!' });
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        return res.status(400).json({ message: 'Incorrect password!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error("Error logging in user:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Save a book to a user's `savedBooks` field by adding it to the set
  async saveBook({ user, body }, res) {
    console.log("saveBook called with user:", user, "body:", body);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      res.json(updatedUser);
    } catch (err) {
      console.error("Error saving book:", err);
      return res.status(400).json(err);
    }
  },

  // Remove a book from `savedBooks`
  async deleteBook({ user, params }, res) {
    console.log("deleteBook called with user:", user, "params:", params);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found!' });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error("Error deleting book:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
