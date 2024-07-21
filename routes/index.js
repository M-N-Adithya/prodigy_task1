const express = require('express');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/auth/login');
}

function isAdmin(req, res, next) {
  if (req.session.role === 'admin') {
    return next();
  }
  res.status(403).send('Access Denied');
}

// Render the index page
router.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

// Render the dashboard page
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { role: req.session.role, user: req.session.user });
});

// Render the admin page
router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.send('Welcome Admin');
});

module.exports = router;
