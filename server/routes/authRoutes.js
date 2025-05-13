const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);
router.get('/logout', authController.logout);
router.get('/me', passport.authenticate('jwt', { session: false }), authController.getCurrentUser);

module.exports = router;