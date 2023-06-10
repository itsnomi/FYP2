const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const requireAuth = require("./middleware/requireAuth");
const requireTeacherAuth = require("./middleware/requireTeacherAuth")
const cors = require('cors');
const Teacher = require("./models/Teacher");
const testSchema = require("./models/Tests");
// const Test = mongoose.model("Test", testSchema);
const Test  = require("./models/Tests")


app.use(express.json());
app.use(cors({ origin: 'http://localhost:4283' }))
const mongoUri = "mongodb+srv://itsnomi:itsnomi@cluster0.sh6yoky.mongodb.net/codeportal?retryWrites=true&w=majority";
//const mongoUri = "mongodb+srv://itsnomi:itsnomi@cluster0.enbv6.mongodb.net/codeportal?retryWrites=true&w=majority";
if (!mongoUri) {
    throw new Error(`MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`);
}
mongoose.set('strictQuery', false);
mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
    console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
    console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.get("/teacher", requireTeacherAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.post("/signup", async (req, res) => {
    const { email, password, name,type } = req.body;
    try {
        const user = new User({ email, password, name,type });
        let result = await user.save();
        console.log(result);
        const message = "USER HAS BEEN CREATED"
        const token = jwt.sign({ userid: user._id }, "I4049TI7EP");
        res.status(200).json({ token, message });
    } catch (err) {
        const message = "User already exists"
        res.send({ token: null, message });
    }
});

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = jwt.sign({ userid: user._id }, "I4049TI7EP");
        res.send({ token, user });
    } catch (err) {
        return res.end(err.message);
    }
});

// retrieve all users from the database using the User model
app.get('/allusers', (req, res) => {
    User.find({}, (err, users) => {
        if (err) throw err;
        res.send(users);
    });
});

// retrieve all users from the database using the Teacher model
app.get('/allteachers', (req, res) => {
    Teacher.find({}, (err, teachers) => {
        if (err) throw err;
        //console.log(teachers)
        res.send(teachers);
    });
});


app.post("/teacher/signup", async (req, res) => {
    const { email, password, institute, name,type } = req.body;
    try {
        const teacher = new Teacher({ email, password, name, institute,type });
        let result = await teacher.save();
        console.log(result);
        const message = "USER HAS BEEN CREATED"
        const token = jwt.sign({ teacherid: teacher._id }, "I4049TI7EP");
        res.status(200).json({ token, message });
    } catch (err) {
        const message = "User already exists"
        res.send({ token: null, message });
    }
});
app.post("/teachersignin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const teacher = await Teacher.login(email, password);
        const token = jwt.sign({ teacherid: teacher._id }, "I4049TI7EP");
        res.send({ token, teacher });
    } catch (err) {
        return res.end(err.message);
    }
});

app.post("/uploadtest", async (req, res) => {
    try {
      const { testExplanation, hint, sampleCode, filename, extension, language } = req.body;
      const test = new Test({ testExplanation, hint, sampleCode, filename, extension, language });
      await test.save();
      const message = "test has been uploaded";
      res.status(201).send({ test, message });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

  app.get("/alltests", async (req, res) => {
    try {
      const tests = await Test.find();
      res.status(200).send(tests);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  

app.listen(8000, () => console.log(`Server is listening on http://localhost:8000`));
