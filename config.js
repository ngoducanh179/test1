
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (e) {
        console.log(e);
        console.error('can not connect the database');
        console.exit(1);
    }
};

module.exports = connectDB;