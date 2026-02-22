const mongoose = require("mongoose");

const unitsSchema = new mongoose.Schema(
  {
    categoryList: { type: [String], default: [] },
    widthList: { type: [String], default: [] },
    colorList: { type: [String], default: [] },
    printplainList: { type: [String], default: [] },
    printingqualityList: { type: [String], default: [] }
  },
  { timestamps: true }
);

unitsSchema.statics.getUnits = async function () {
  let units = await this.findOne();
  if (!units) {
    units = new this({});
    await units.save();
  }
  return units;
};

module.exports = mongoose.model("Units", unitsSchema);
