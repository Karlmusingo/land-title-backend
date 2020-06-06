import { Title } from '../models';
import { statusCodes } from '../constants';

/**
 * @export
 * @class TitleController
 */
export default class TitleController {
  /**
   * Create a title
   *
   * @author Agbolade Adeniyi
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} title
   * @memberof TitleController
   */
  static async create(req, res) {
    const { title, squareMeter, mortgage, address } = req.body;

    const newTitle = await Title.create({
      title, squareMeter, mortgage, address
    });

    return res.status(statusCodes.CREATED).json({
      status: 'success',
      data: newTitle
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
   * @memberof TitleController
   */
  static async getAll(req, res) {
    const titles = await Title.find();

    return res.status(statusCodes.OK).json({
      status: 'success',
      titles,
    });
  }

  /**
   * Search for title
   *
   * @author Agbolade Adeniyi
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {array} 
   * @memberof TitleController
   */
  static async searchTitle(req, res) {
    
    
    const title = await Title.find({
      name: req.query
    });

    return res.status(statusCodes.OK).json({
      status: 'success',
      title,
    });
  }
}
