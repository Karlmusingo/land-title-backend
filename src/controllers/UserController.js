import bcrypt from '../helpers/bcrypt';
import jwt from '../helpers/jwt';
import { User } from '../models';
import { statusCodes } from '../constants';
import {
  status, messages,
  successResponse, errorResponse, conflictResponse,
} from '../helpers/response';

/**
 * @export
 * @class UserController
 */
export default class UserController {
  /**
   * Create a User
   * @author Agbolade Adeniyi
   * @method signup
   * @description Method to register a user
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} user
   * @memberof UserController
   */
  static async signup(req, res) {
    const { firstName, lastName, password, email } = req.body;
    const userExits = await User.findOne({ email });
    if (userExits) {
      return conflictResponse(res, status.conflict, messages.signUp.conflict);
    }
    const hashedPassword = bcrypt.hashPassword(password);
    const user = await User.create({
      firstName, lastName, password: hashedPassword, email
    });

    const token = await jwt.generateToken({ id: user._id });
    const response = {
      firstName, lastName, email
    }
    return successResponse(res, status.created, messages.signUp.success, response, token);
  }

  /**
   * @author Agbolade Adeniyi
   * @method signin
   * @description Method to login a user
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {array} 
   * @memberof UserController
   */
  static async signin(req, res) {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, status.unauthorized, messages.signIn.invalid);
    }
    const isPasswordValid = await bcrypt.comparePassword(user.password, password);

    if (!isPasswordValid) {
      return errorResponse(res, status.unauthorized, messages.signIn.invalid);
    }
    const {
      firstName,
      lastName,
    } = user
    const token = await jwt.generateToken({ id: user._id });
    return successResponse(
      res,
      status.success,
      messages.signIn.success,
      {
        firstName,
        lastName
      },
      token);
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
