// Run this file on its own any time we want to seed the database

const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Function to return random item from array
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    // Delete everything
    await Campground.deleteMany({});
    for(let i=0; i<50; i++) {
        // Pick a random city from array
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

// Add then() to add connection close - seedDB returns a promise so can chain then()
seedDB().then(() => {
    mongoose.connection.close();
});