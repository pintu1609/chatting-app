const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const messageSchema = Schema({
//   file: {
//     type: String,
//     index: true,
//   },
//   image: {
//     type: String,
//     index: true,
//   },
//   text: {
//     type: String,
//   },
//   type: {
//     type: String,
//     enum: ["text", "image", "file"],
//   },
// });

const mainMessageSchema = Schema(
  {
    from: {
      type: Schema.ObjectId,
      index: true,
    },
    to: {
      type: Schema.ObjectId,
      index: true,
    },
    message: {
        type: String,
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("mainmessages", mainMessageSchema);
