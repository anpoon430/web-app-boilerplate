const router = require('express').Router();


//routes here are mounted on /api
router.use(require('./sample'));

module.exports = router;
