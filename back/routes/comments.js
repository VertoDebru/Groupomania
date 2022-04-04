const express = require('express');
const router = express.Router();

// Middlewares
const multer = require('../middlewares/multer-config');
// Controllers
const ctrlComment = require('../controllers/comments');

router.get('/', ctrlComment.commentsGet);
router.post('/', multer.single('image'), ctrlComment.commentAdd);
router.put('/', multer.single('image'), ctrlComment.commentEdit);
router.delete('/', ctrlComment.commentDel);

module.exports = router;
