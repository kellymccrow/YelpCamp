const mongoose = require('mongoose');
const cities = require('./cities');
const nz = require('./nz');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
 
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl)
.then(() => {
    console.log('Database connected')
})
.catch(err => {
    console.log('connection error:')
    console.log(err)
});

const sample = array => array[Math.floor(Math.random() * array.length)];

// console.log(nz[1]);

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 100; i++) {
        const random250 = Math.floor(Math.random() * 250);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6260e48f9c157d706eb3bbda',
            location: `${nz[random250].city}, ${nz[random250].capital}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, quia quibusdam! Minus doloremque repellendus harum aspernatur voluptate quasi architecto impedit cupiditate velit voluptas voluptatibus aliquam ipsam, similique, labore dignissimos eos, ullam asperiores adipisci. A minus quaerat cupiditate animi, iusto debitis itaque nisi dolor cum sapiente reiciendis alias quibusdam officia omnis.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    nz[random250].lng,
                    nz[random250].lat
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dp9esmerx/image/upload/v1649986561/YelpCamp/sakk34skatx4bgengbwk.jpg',
                  filename: 'YelpCamp/sakk34skatx4bgengbwk',
                },
                {
                  url: 'https://res.cloudinary.com/dp9esmerx/image/upload/v1649986563/YelpCamp/mraexlrf8fcw058axjj1.jpg',
                  filename: 'YelpCamp/mraexlrf8fcw058axjj1',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})