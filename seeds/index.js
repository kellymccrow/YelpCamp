const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(() => {
    console.log('Database connected')
})
.catch(err => {
    console.log('connection error:')
    console.log(err)
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, quia quibusdam! Minus doloremque repellendus harum aspernatur voluptate quasi architecto impedit cupiditate velit voluptas voluptatibus aliquam ipsam, similique, labore dignissimos eos, ullam asperiores adipisci. A minus quaerat cupiditate animi, iusto debitis itaque nisi dolor cum sapiente reiciendis alias quibusdam officia omnis.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})