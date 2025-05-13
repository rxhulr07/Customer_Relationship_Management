const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const passport = require('passport');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  campaignController.createCampaign
);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  campaignController.getCampaigns
);

module.exports = router;