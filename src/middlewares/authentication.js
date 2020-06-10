import { verifyToken, errorResponse } from '../helpers/response';
import jwt from '../helpers/jwt';

/**
 * @class Authenticate
 * @description authenticate tokens and roles
 * @exports Authenticate
 */
class Authenticate {
  /**
   * Verify if token is valid
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {String} req.userId - The user id
   */
  static async verifyToken(req, res, next) {
    try {
      const { headers: { authorization } } = req;
      if (!authorization) {
        return errorResponse(res, 401, 'Please include the authorization token');
      }
      const token = authorization.split(' ')[1];
      if (!token || token === '') {
        return errorResponse(res, 401, 'Access denied.');
      }
      
      const decoded = await jwt.verifyToken(token);
      
      if (!(decoded && decoded.id)) {
        return errorResponse(res, 401, 'Access denied. We could not verify user');
      }
      req.user = decoded;
      return next();
    } catch (error) {
      console.log(error.message);
      
      return errorResponse(res, 500, 'Server error');
    }
  }

}

export default Authenticate;
