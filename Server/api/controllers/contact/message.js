const {
  responseHandler,
  clientHandler,
} = require("../../middlewares/response-handler");
const service = require("../../service/contact/message");
// const spaceUserService = require('../../service/space/spaceUsers');
const { default: mongoose } = require("mongoose");
const { search } = require("../../queries/message");

exports.create = async (req, res, next) => {
  try {
    const value = req.value;
    value.from = req.user.id;
    let response;
    response = await service.create(value);

    if (!response) return clientHandler("message isn't sent yet !!", res);

    responseHandler(response, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getList = async (req, res, next) => {
  try {
    let queryFilter = req.query ? req.query : {};
    const userId = req.user.id;

    // let filter = { from: new mongoose.Types.ObjectId(userId) };

    let filter;

    // handling pagination ...
    const pagination = { skip: 0, limit: 10 };
    if (queryFilter.pageNo && queryFilter.pageSize) {
      pagination.skip = parseInt(
        (queryFilter.pageNo - 1) * queryFilter.pageSize
      );
      pagination.limit = parseInt(queryFilter.pageSize);
    }

    if (queryFilter.to) {
      filter = {
        $or: [
          {
            from: new mongoose.Types.ObjectId(userId),
            to: new mongoose.Types.ObjectId(queryFilter.to),
          },
          {
            from: new mongoose.Types.ObjectId(queryFilter.to),
            to: new mongoose.Types.ObjectId(userId),
          },
        ],
      };
    } else {
      return responseHandler(null, res, "Specify the user you want to chat !!");
    }

    
    const queries = search(filter, pagination);
    console.log("Filter:", JSON.stringify(queries));

    let response = await service.search(queries);

    responseHandler(response, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
