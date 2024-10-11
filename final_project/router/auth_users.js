const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
const TOKEN_SECRET = "verySecret";

const isValid = (username)=>{ 
  return users.filter((user) => {
    return user.username === username
  }).length;
}

const authenticatedUser = (username,password)=>{
  return users.filter((user) => {
    return user.username === username && user.password === password
  }).length;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (authenticatedUser(username, password)) {
    const token = jwt.sign({username}, TOKEN_SECRET, {expiresIn: 60});
    req.session.authorization = token;
    return res
      .status(200)
      .json({message: "login successfully"});
  } else {
    return res
      .status(400)
      .json({message: "login fail!"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = jwt.verify(req.session.authorization, TOKEN_SECRET);
  if (username) {
  } else {
      return res
          .status(403)
          .json({message: "unauthenticate"})
  }

  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    const content = req.body.content;
    const reviews = book.reviews;
    const existingReview = reviews[username];
    if (existingReview) {
      existingReview.content = content;
    } else {
      reviews[username.username] = content
    }
    return res
      .status(200)
      .json({message: 'updated successful'});
  } else {
    return res
      .status(400)
      .json({message: "invalid isbn"});
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = jwt.verify(req.session.authorization, TOKEN_SECRET);
  if (username) {
  } else {
      return res
          .status(403)
          .json({message: "unauthenticate"})
  }

  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    const reviews = book.reviews;
    
    let existingReview = reviews[username.username];
    
    if (existingReview) {
      delete reviews[username.username];
    } else {
      return res
      .status(200)
      .json({message: 'review not existed'});
    }
    return res
      .status(200)
      .json({message: 'deleted successful'});
  } else {
    return res
      .status(400)
      .json({message: "invalid isbn"});
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
