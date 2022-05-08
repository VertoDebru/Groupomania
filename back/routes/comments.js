const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
// Controllers
const ctrlComment = require('../controllers/comments');

router.get('/', auth, ctrlComment.commentsGet);
router.post('/', auth, multer.single('image'), ctrlComment.commentAdd);
router.put('/:id', auth, multer.single('image'), ctrlComment.commentEdit);
router.delete('/:id', auth, ctrlComment.commentDel);

module.exports = router;
