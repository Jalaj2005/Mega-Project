const mongoose = require("mongoose");
const intiData =  require("./data.js");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
};

// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data.map((obj) => ({...obj, owner: "6a3f5aa6e3cea8846fd9bbdd"}));
//     await Listing.insertMany(intiData.data);
//     console.log("data was initialized");
// };
const initDB = async () => {
  await Listing.deleteMany({});
  const newListings = initData.data.map((obj) => ({...obj, owner: "6a3f5aa6e3cea8846fd9bbdd" }));
  await Listing.insertMany(newListings);
  console.log("data was initialized");
};

initDB();