const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = Schema(
  {
    userId: {
      type: Schema.ObjectId,
      index: true,
    },
    addedTo: {
      type: Schema.ObjectId,
      index: true,
    },
    ids: {
      type: [{ type: Schema.ObjectId }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contacts", contactSchema);
