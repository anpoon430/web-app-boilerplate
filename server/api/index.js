const router = require('express').Router();


//routes here are mounted on /api
router.use(require('./sample'));

router.use((req, res, next)=>{
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

module.exports = router;
