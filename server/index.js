const express = require('express');
const cors = require('cors')
const port = 4000;
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const User = require('./models/User')
const Resume = require('./models/Resume')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();


const salt = bcrypt.genSaltSync(10);
const secret = "hcewqyt378w35thgnbw";

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}));
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://muditert34:RIte0xT8kIDq8lOw@cluster0.gfhbiml.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc)
    } catch (e) {
        res.status(404).json(e)
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const userDoc = await User.findOne({ username });

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);

        if (passOk) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                }).json({
                    id: userDoc._id,
                    username,
                });

            })
        } else {
            res.status(400).json('wrong credentials')
        }
    } else {
        res.status(400).json('wrong credentials');
    }

})

app.post('/resume', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;

        const {
            name,
            role,
            phone,
            address,
            linkedin,
            github,
            gmail,
            skills,
            experience1,
            experience2,
            qualifications1,
            qualifications2,
        } = req.body;

        console.log(req.body);

        const ResumeDoc = await Resume.create({
            name,
            role,
            phone,
            address,
            linkedin,
            github,
            gmail,
            skills,
            experience1,
            experience2,
            qualifications1,
            qualifications2,
            author: info.id,
        });

        res.json(ResumeDoc);
    });
});

app.get('/resume', async (req, res) => {
    res.json(
        await Resume.find()
            .populate('author', ['username'])
    );
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
