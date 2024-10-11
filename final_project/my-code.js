const axios = require('axios');

async function getBooksList() {
    const response = await axios.get("http://localhost:5000/");
    console.log(response.data);
}
// getBooksList();






async function getBooksDetailByIsbn(isbn) {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    console.log(response.data);
}
// getBooksDetailByIsbn(1);





async function getBooksDetailByAuthorName(authorName) {
    const response = await axios.get(`http://localhost:5000/author/${authorName}`);
    console.log(response.data);
}
// getBooksDetailByAuthorName('Samuel Beckett');




async function getBooksDetailByTitle(title) {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log(response.data);
}
getBooksDetailByTitle('One Thousand and One Nights');