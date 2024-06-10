const { Schema } = require('mongoose');

// Define a subdocument schema for books, which will be part of the User's savedBooks array
const bookSchema = new Schema({
  authors: [{
    type: String,
  }],
  description: {
    type: String,
    required: true,
  },
  // Book ID from an external source like GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = bookSchema;
