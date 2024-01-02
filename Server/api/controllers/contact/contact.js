const {
  responseHandler,
  clientHandler,
} = require("../../middlewares/response-handler");
const service = require("../../service/contact/contact");
const userService = require("../../service/auth/user");
const { default: mongoose } = require("mongoose");
const { search } = require("../../queries/contact");

exports.create = async (req, res, next) => {
  try {
    const value = req.value;
    value.userId = req.user.id;
    let response;
    const ids = [];
    ids.push(value.userId);
    if (value.addedTo) {
      value.addedTo = await userService.findOne({ userName: value.addedTo });
    } else {
      return responseHandler(
        null,
        res,
        "User not exist in the Database !!",
        400
      );
    }
    if (String(value.userId) === String(value.addedTo?._id)) {
      return responseHandler(
        null,
        res,
        "you cannot add yourself in FriendList !!",
        400
      );
    }
    if (value.addedTo) {
      let query = [
        {
          $match: {
            $or: [
              {
                addedTo: new mongoose.Types.ObjectId(value.userId),
                userId: new mongoose.Types.ObjectId(value.addedTo),
              },
              {
                userId: new mongoose.Types.ObjectId(value.userId),
                addedTo: new mongoose.Types.ObjectId(value.addedTo),
              },
            ],
          },
        },
      ];
      const contactData = await service.aggregate(query);
      if (contactData.length)
        return responseHandler(
          null,
          res,
          "Already in the contact in this !!",
          400
        );
    }

    if (!value.addedTo)
      return clientHandler("user not found in the Database !!", res);
    ids.push(value.addedTo);
    value.ids = ids;
    response = await service.create(value);

    if (!response) return clientHandler("contact can't be added !!", res);

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

    let filter = {
      $or: [
        {
          userId: new mongoose.Types.ObjectId(userId),
        },
        {
          addedTo: new mongoose.Types.ObjectId(userId),
        },
      ],
    };
    // handling pagination ...
    const pagination = { skip: 0, limit: 10 };
    if (queryFilter.pageNo && queryFilter.pageSize) {
      pagination.skip = parseInt(
        (queryFilter.pageNo - 1) * queryFilter.pageSize
      );
      pagination.limit = parseInt(queryFilter.pageSize);
    }

    const queries = search(filter, pagination);

    let response = await service.search(queries);

    responseHandler(response, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
