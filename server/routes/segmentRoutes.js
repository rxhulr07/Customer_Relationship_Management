const express = require('express');
const router = express.Router();
const segmentController = require('../controllers/segmentController');
const passport = require('passport');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  segmentController.createSegment
);
router.post(
  '/preview',
  passport.authenticate('jwt', { session: false }),
  segmentController.previewSegment
);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  segmentController.getSegments
);

module.exports = router;