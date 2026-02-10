const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.post('/upload', contentController.uploadContent);
router.get('/all', contentController.getContents);

module.exports = router;
