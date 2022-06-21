const router = require('express').Router();
const {callFilms} = require('../controller/index') 

router.get('/', callFilms)

module.exports = router;