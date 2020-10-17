const bcrypt = require('bcryptjs');

//@desc     Creates an encripted password
const encryptPass = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const encriptedPass = await bcrypt.hash(password, salt);
      resolve(encriptedPass);
    } catch (e) {
      reject(e);
    }
  });
};

//@desc     Checks if passwords match
const checkPassMatch = async (dbPassword, enteredPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isMatch = await bcrypt.compare(enteredPassword, dbPassword);
      resolve(isMatch);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  encryptPass: encryptPass,
  checkPassMatch: checkPassMatch,
};