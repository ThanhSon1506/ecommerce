const express = require('express');
const app = express();
const env = require('dotenv');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookiePraser = require('cookie-parser');

//routes
const userRoute = require('./routes/auth');
const adminRoute = require('./routes/admin/auth');
const categoryRoute = require('./routes/category');

//environment variable or you can say constants
env.config();
// mongodb connection
//mongodb+srv://root:<password>@cluster0.fi8d0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.fi8d0.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.fi8d0.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected');
});
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookiePraser());
//Router variable
app.use('/api', userRoute);
app.use('/api', adminRoute);



app.get('/', (req, res, next) => {
    res.status(200).json({
        message: `Hello from Server${process.env.MONGO_DB_PASSWORD}`
    });
});
app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    });
});
app.listen(process.env.PORT, () => {
    console.log(`Serve is running on port ${process.env.PORT}`);
});
