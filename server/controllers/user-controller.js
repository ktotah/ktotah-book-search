// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by either their id or their username
  async getSingleUser({ user = null, params }, res) {
    try {
      console.log("getSingleUser called with user:", user, "params:", params); // Added logging
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      });

      if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }

      res.json(foundUser);
    } catch (err) {
      console.error("Error in getSingleUser:", err); // Added logging
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser({ body }, res) {
    console.log("createUser called with body:", body); // Added logging
    try {
      const user = await User.create(body);

      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error("Error creating user:", err); // Added logging
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ body }, res) {
    console.log("login called with body:", body); // Added logging
    try {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error("Error logging in user:", err); // Added logging
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
  async saveBook({ user, body }, res) {
    console.log("saveBook called with user:", user, "body:", body); // Added logging
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } }, // Ensure body includes the link field
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.error("Error saving book:", err); // Added logging
      return res.status(400).json(err);
    }
  },

  // remove a book from `savedBooks`
  async deleteBook({ user, params }, res) {
    console.log("deleteBook called with user:", user, "params:", params); // Added logging
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
      }
      return res.json(updatedUser);
    } catch (err) {
      console.error("Error deleting book:", err); // Added logging
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
