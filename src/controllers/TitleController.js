import { Title, Transactions } from '../models';
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
    const { title, owner, squareMeter, mortgage, address } = req.body;

    const newTitle = await Title.create({
      title,
      owner,
      squareMeter,
      mortgage,
      address,
    });

    return res.status(statusCodes.CREATED).json({
      status: 'success',
      data: newTitle,
    });
  }

  /**
   * Get all the titles
   *
   * @author Agbolade Adeniyi
   * @static
   * @param {*} req the request param
   * @param {*} res the response param
   * @returns {array} the return response
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
   * Search for a title in the database
   *
   * @author Agbolade Adeniyi
   * @static
   * @param {*} req the request param
   * @param {*} res the response param
   * @returns {array} the return response
   * @memberof TitleController
   */
  static async searchTitle(req, res) {
    const { param } = req.query;
    const title = await Title.find({
      title: param,
    });

    if (title.length === 0) {
      return res.status(404).json({
        message: 'Title not found',
      });
    }
    return res.status(statusCodes.OK).json({
      status: 'success',
      title,
    });
  }

  /**
   * Search for a title in the database
   *
   * @author Agbolade Adeniyi
   * @static
   * @param {*} req the request param
   * @param {*} res the response param
   * @returns {array} the return response
   * @memberof TitleController
   */
  static async createTransaction(req, res) {
    const { id } = req.params;
    const title = await Title.find({
      _id: id,
    });

    if (title.length === 0) {
      return res.status(404).json({
        message: 'Title not found',
      });
    }

    const { newOwner, cost } = req.body;

    const newTitle = await Transactions.create({
      cost,
      oldOwner: title.owner,
      title: title._id,
    });

    title.updateOne({
      owner: newOwner,
    });

    return res.status(statusCodes.CREATED).json({
      status: 'success',
      data: newTitle,
    });
  }

  /**
   * Get all the titles
   *
   * @author Agbolade Adeniyi
   * @static
   * @param {*} req the request param
   * @param {*} res the response param
   * @returns {array} the return response
   * @memberof TitleController
   */
  static async getAllTransactions(req, res) {
    const { id } = req.params;
    const title = await Title.find({
      _id: id,
    });

    if (title.length === 0) {
      return res.status(404).json({
        message: 'Title not found',
      });
    }
    const transactions = await Transactions.find({ title: title._id });

    return res.status(statusCodes.OK).json({
      status: 'success',
      transactions,
    });
  }
}
