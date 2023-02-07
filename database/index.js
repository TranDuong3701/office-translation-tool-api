const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost/office-translation-tool"
    );
    console.log("DB Connected");
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { connect };
