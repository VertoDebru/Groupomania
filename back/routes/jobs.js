const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth');
// Controllers
const ctrlJob = require('../controllers/jobs');

router.get('/', ctrlJob.jobsGet);
router.post('/', auth, ctrlJob.jobAdd);
router.put('/:id', auth, ctrlJob.jobEdit);
router.delete('/:id', auth, ctrlJob.jobDel);

module.exports = router;
