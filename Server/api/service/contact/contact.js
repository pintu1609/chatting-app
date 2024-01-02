const dal = require("../../dal/dal");
const model = require("../../models/contact/contact");

exports.create = async (body) => {
  return await dal.create(model, body);
};

exports.findOne = async (filter) => {
  return await dal.findOne(model, filter, {});
};

exports.aggregate = async (query) => {
  return await dal.aggregate(model, query);
};

exports.find = async (filter) => {
  return await dal.find(model, filter, {});
};

exports.search = async (query) => {
  const data = await dal.aggregate(model, query);
  return {
    data: data[0].data,
    totalCount: data[0].count[0] ? data[0].count[0].count : 0,
  };
};

exports.upsert = async (filter, body) => {
  if (body.values) {
    return await dal.findOneAndUpsert(model, filter, {
      $push: { values: body.values },
    });
  }
  return await dal.findOneAndUpsert(model, filter, body);
};
exports.update = async (filter, body) => {
  return await dal.findOneAndUpdate(model, filter, body);
};

exports.hard = async (filter) => {
  return await dal.findOneAndDelete(model, filter);
};
