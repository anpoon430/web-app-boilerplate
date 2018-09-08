const router = require('express').Router();
const { User } = require('../db')

//routes here are mounted on /login


module.exports = router;

router.post('/signup', async(req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => {
      if (err) return next(err);
      else res.send(user);
    });
  }catch(err){
    next(err)
  }
});

router.put('/login', async(req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) res.status(401).send('User not found');
    else if (! await user.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect password');
    }
    else {
      req.login(user, err => {
        if (err) return next(err);
        else res.send(user);
      });
    }
  }catch(err){
    next(err)
  }
});

router.get('/me', (req, res, next) => {
  res.send(req.user);
});

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy()
  res.sendStatus(204);
});
