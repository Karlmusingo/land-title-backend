import bcrypt from 'bcrypt';


/**
   * @description Hash Password Method
   * @method generateToken
   * @param {string} password
   * @returns {string} returns hashed password
*/
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = password => bcrypt.hashSync(password, salt);

/**
   * @description comparePassword
   * @method comparePassword
   * @param {string} hashedPassword
   * @param {string} password
   * @returns {Boolean} return True or False
*/
const comparePassword = (hashedPassword, password) => bcrypt.compareSync(password, hashedPassword);


export default {
  hashPassword,
  comparePassword
};
