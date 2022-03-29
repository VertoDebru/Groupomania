const express = require('express');
const router = express.Router();

// Middlewares
const multer = require('../middlewares/multer-config');
// Controllers
const ctrlComment = require('../controllers/comments');

router.get('/', ctrlComment.commentsGet);
router.post('/', multer, ctrlComment.commentAdd);
router.put('/', multer, ctrlComment.commentEdit);
router.delete('/', ctrlComment.commentDel);

module.exports = router;
