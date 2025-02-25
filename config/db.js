const mongoose = require('mongoose')

const dbConnection = async () => {
  await mongoose.connect(`${process.env.MONGO_URI}/shopifyPublicAppDemo`)
    .then(() => console.log(`DB Connected`))
    .catch(() => console.log(`DB Connection Error`))
}

module.exports = dbConnection