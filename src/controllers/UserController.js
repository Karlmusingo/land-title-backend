import { User } from '../models';
import { statusCodes } from '../constants';

/**
 * @export
 * @class UserController
 */
export default class UserController {
  /**
   * Create a User
   *
   * @author Agbolade Adeniyi
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} user
   * @memberof UserController
   */
  static async create(req, res) {
    const { firstName, lastName, password, email } = req.body;

    const user = await User.create({
        firstName, lastName, password, email
    });

    return res.status(statusCodes.CREATED).json({
      status: 'success',
      user,
    });
  }

  /**
   * Get all the users
   *
   * @author Agbolade Adeniyi
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {array} 
   * @memberof UserController
   */
  static async getAll(req, res) {
    const users = await User.find();

    return res.status(statusCodes.OK).json({
      status: 'success',
      users,
    });
  }

  /**
   * Search for User
   *
   * @author Agbolade Adeniyi
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {array}
   * @memberof UserController
   */
  static async searchUser(req, res) {
    
    
    const User = await User.find({
      name: req.query
    });

    return res.status(statusCodes.OK).json({
      status: 'success',
      User,
    });
  }
}
