const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const session = require('express-session');
const {db} = require('./db')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const dbStore = new SequelizeStore({ db });
const { User } = require ('./db')




app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json())
app.use(express.urlencoded({extended: false}))


dbStore.sync();

app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})


app.use(require('./api'))






app.get('*', (req,res,next)=>{
  res.sendFile(path.join(__dirname, '../public/index.html'));
})


app.use((err, req, res, next)=>{
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


module.exports = app
