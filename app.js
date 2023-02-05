const path = require('path');
const express = require("express");
const feedRoute = require("./routes/feed");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer');
const authRoute = require('./routes/auth');

const { v4: uuidv4 } = require('uuid');

const dotenv = require('dotenv');
dotenv.config()

const app = express();


const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + file.originalname)
     //cb(null, file.fieldname + '-' + uniqueSuffix)
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
  );
app.use('/images',express.static(path.join(__dirname,'images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept");
  next();
});

app.use("/feed", feedRoute);
app.use('/auth', authRoute);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message });
  });
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(result=>{
    const server = app.listen(9090);
    const io = require('./socket').init(server);
    io.on('connection',socket=>{
      console.log('client connected');
    });
  })
  .catch(err=>{
    console.log(err);
  });


