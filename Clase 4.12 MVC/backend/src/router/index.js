const router = require('express').Router();
const {createUser, renderUser} = require('../controller/index')


router.post('/', createUser);
router.get('/', renderUser);


module.exports = router