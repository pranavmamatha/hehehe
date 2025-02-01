const express = require('express');
const { getNews } = require('../controllers/newsController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getNews);

module.exports = router; 