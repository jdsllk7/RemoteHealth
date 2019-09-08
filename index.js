var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();

app.set('View engine', 'ejs');
app.use(cookieParser());
app.use('/public', express.static('public'));

//ADD SERVICE WORKER
app.get("/sw.js", function (req, res) {
    res.header("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, "/sw.js"));
});


//JS SESSIONS
app.use(session({
    secret: 'secret101jdslk',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//DISPLAY REGISTER PAGE
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/register.html'));
});

app.get('/home', function (request, response) {
    response.cookie('med_id', request.query.med_id, { maxAge: 31556952000 });
    // console.log(request.query.med_id);
    response.sendFile(path.join(__dirname + '/home.html'));
});

app.get('/fallback', function (request, response) {
    response.sendFile(path.join(__dirname + '/fallback.html'));
});

app.get('/respond', function (request, response) {
    response.sendFile(path.join(__dirname + '/respond.html'));
});

app.get('/icon', function (request, response) {
    response.sendFile(path.join(__dirname + '/public/img/Clip.ico'));
});

app.get('/signOut', function (request, response) {
    response.clearCookie('med_id');
    console.log('SignOut');
    response.redirect('/');
});

app.get('/map', function (request, response) {
    response.render('map.ejs', { lat: request.query.lat, long: request.query.long, name: request.query.name });
});






//LISTEN TO PORT
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Running localhost:3000');
});