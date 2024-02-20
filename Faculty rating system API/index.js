const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 8998;
const adminRouter = require("./routes/admin");
const facultyRouter = require('./routes/facuty')
const studentRouter = require('./routes/student')
const cookieParser = require('cookie-parser');

const courseRouter = require('./routes/course')
const session = require("express-session");
const crypto = require("crypto");
const MongoStore = require('connect-mongo');

app.use(cors({
    origin : ["http://localhost:1234"],
    methods : ["POST" , "GET"],
    credentials : true,
}));


const secretKey = crypto.randomBytes(32).toString('hex');

dotenv.config();
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

app.use(cookieParser());
const mongoURI = process.env.MONGO_URI;

const store = MongoStore.create({
    mongoUrl: mongoURI,
    collectionName: 'sessions' // Optional: Specify the collection name for sessions
});

app.use(session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
    store : store,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 86400000
    }
}))

app.use('/api/admin', adminRouter);

app.use('/api/faculty', facultyRouter);
app.use('/api/course', courseRouter);
app.use('/api/student', studentRouter);


mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("Database is connected") })
    .catch((err) => { console.log(`Error in connecting with databse ${err}`) })


app.listen(port, () => {
    console.log(`Server is running on port ${port}....`)
})