const express = require('express');
const { addWord, getWords } = require('../controllers/wordController');
const router = express.Router();

router.post('/add', addWord);
router.get('/', getWords);

module.exports = router;
