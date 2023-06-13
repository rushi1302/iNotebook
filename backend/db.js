const mongoose = require("mongoose");

const mongo_URI = "mongodb+srv://rushidhavale:rushidhavale@cluster0.iiyglup.mongodb.net/iNotebook?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose.connect(mongo_URI,).then(() => console.log("successfullu connected")).catch((e) => console.log(e));
};


module.exports = connectToMongo;