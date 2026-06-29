const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { object } = require("joi");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: Object,
        default:
            "https://images.unsplash.com/photo-1760715658357-57df8f045b8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        set: (v) => 
            v === "" 
        ? "https://images.unsplash.com/photo-1760715658357-57df8f045b8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" 
        : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ]
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in: listing.reviews} });
    }
});

const Listing = mongoose.model("Listings", listingSchema);
module.exports = Listing;