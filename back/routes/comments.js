const express = require('express');
const router = express.Router();

const ctrlComment = require('../controllers/comments');

router.get('/', ctrlComment.commentsGet);

module.exports = router;
