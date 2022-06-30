const router = require('express').Router();
const route = require('./user');

router.use('/user', route);

module.exports = router;