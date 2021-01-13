// const mongoose = require('mongoose')



// const URL = 'mongodb://localhost:27017'

// const client = new MongoClient(URL, {useUnifiedTopology: true})

// client.connect()

// const db = client.db('wlb')

// module.exports = db

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

const connexionString = 'mongodb://localhost:27017/test'

module.exports = {
    connexionString
}

