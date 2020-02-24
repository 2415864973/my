var express = require('express');
var booksControllers = require('../controllers/books.js');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

router.get('/bookList',booksControllers.bookList);

module.exports = router;