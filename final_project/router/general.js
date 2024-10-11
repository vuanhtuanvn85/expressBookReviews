const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!isValid(username)) {
    if (username && password) {
      users.push({username, password});
      return res
        .status(200)
        .json({message: `${username} is registered!`});
    } else {
      return res
        .status(400)
        .json({message: "must provide username and password"});
    }
  } else {
    return res
      .status(400)
      .json({message: "user already existed!"})
  }
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  return res
    .status(200)
    .json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  return res
    .status(200)
    .json( books[req.params.isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const keys = Object.keys(books);
  
  keys.forEach(key => {
    const book = books[key];
    if (book.author === author) {
      return res
        .json(book);
    }
  });
  return res
    .json({"message": "not found book"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const keys = Object.keys(books);
  
  keys.forEach(key => {
    const book = books[key];
    if (book.title === title) {
      return res
        .json(book);
    }
  });
  return res
    .json({"message": "not found book"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
