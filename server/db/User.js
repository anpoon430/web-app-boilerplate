const Sequelize = require('sequelize');
const bcrypt = require('bcrypt')
const db = require('./db');


const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  }
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});

const saltRounds = 10;



// instance methods
User.prototype.correctPassword = async function (candidatePassword) {
  // should return true or false for if the entered password matches
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  }catch(err){
    console.error(err)
  }
};

// class methods
User.generateSalt = () => {
  return bcrypt.genSalt(saltRounds);
};

User.encryptPassword = (plainText, salt) => {
  // accepts a plain text password and a salt, and returns its hash
  return bcrypt.hash(plainText, salt);
};

async function setSaltAndPassword (user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  try {
    user.salt = await User.generateSalt();
    user.password = await User.encryptPassword(user.password, user.salt);
  }catch(err){
    console.error(err)
  }
}

module.exports = User;
