const router = require('express').Router();
const passport = require('passport')
const { User } = require('../db')
require('../../secrets');

// if (process.env.NODE_ENV === 'development') {
// }
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/verify'
};
// collect our google configuration into an object

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, async(token, refreshToken, profile, done) => {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;
  try {
    let user = await User.findOne({where: { googleId: googleId  }})
    if (!user) {
      user = await User.create({ name, email, googleId })
      done(null, user);
    } else {
      done(null, user);
    }
  } catch(err){
    console.error(err)
  }
});

// register our strategy with passport
passport.use(strategy);


router.get('/', passport.authenticate('google', { scope: 'email' }))

// handle the callback after Google has authenticated the user
router.get('/verify',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`/users/${req.user.id}`)
  }
)



module.exports = router
