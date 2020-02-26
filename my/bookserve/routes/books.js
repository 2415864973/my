var express = require('express');
var booksControllers = require('../controllers/books.js');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

router.get('/getBookList',booksControllers.getBookList);
router.get('/getImg/:range/:imgName',booksControllers.getImg);
router.post('/saveBook',booksControllers.saveBook);
router.get('/getBook',booksControllers.getBook);

module.exports = router;