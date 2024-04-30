const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./connection/database')
const users = require('./routes/user')
const loginuser = require('./routes/login')
const attendance = require('./routes/attendace')
const getatm = require('./routes/getattendance')
const forgotPassword = require('./routes/forgotPassword');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('signup.html', { root: 'views' })
});
app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'views' })
})
app.get('/home', (req, res) => {
    res.sendFile('home.html', { root: 'views' })
})

app.get('/attendance-records', (req, res) => {
    res.sendFile('attendance-records.html', { root: 'views' })
})

app.get('/about-us', (req, res) => {
    res.sendFile('about-us.html', { root: 'views' })
})

app.get('/contact-us', (req, res) => {
    res.sendFile('contact-us.html', { root: 'views' })
})
app.get('/reviwes', (req, res) => {
    res.sendFile('reviwes.html', { root: 'views' })
})

app.get('/query', (req, res) => {
    res.sendFile('query.html', { root: 'views' })
})

app.get('/admin', (req, res) => {
    res.sendFile('admin.html', { root: 'views' })
})

app.get('/allattendance', (req, res) => {
    res.sendFile('allattendance.html', { root: 'views' })
})

app.get('/forgotpassword', (req, res) => {
    res.sendFile('forgotpassword.html', { root: 'views' })
})






app.use('/signup', users);
app.use('/login', loginuser)
app.use('/user', attendance)
app.use('/userattendanc', getatm)
app.use('/password', forgotPassword);

sequelize.sync().then(() => {



    app.listen(3000, () => {
        console.log('server is running on port  3000')
    })


}).catch((err) => {
    console.log(err)

})