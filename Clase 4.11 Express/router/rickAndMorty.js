const router = require('express').Router();
const {character} = require('../controller/index')


router.get('/', character)

module.exports = router