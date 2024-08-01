var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const { synchronizeData } = require('./Controllers/ChauffContro');

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require("./config.json");
const AuthRoute = require('./routes/adminRoutes');
const Agentrout = require('./routes/AgentRoute');
const Agentchauff = require('./routes/ChauffeurRoute');
const ClRoute = require('./routes/ClientRoute');
const Rec = require('./routes/ReclamationRout');
const Voi = require('./routes/VoitureRoutes');
const tar = require('./routes/TarifRoute');
const con = require('./routes/ContactRoute');
const rides = require('./routes/RideRoute');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { runAggregation } = require('./Controllers/RideController'); // Export runAggregation function


mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('DB Connection Estabblished !')
    

})


var app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
const corsOptions = {

   // origin:'https://front-admin-vert.vercel.app', 

    origin: 'http://localhost:3002',

    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', AuthRoute);
app.use('/agent', Agentrout);
app.use('/Chauff', Agentchauff);
app.use('/Client', ClRoute);
app.use('/Rec', Rec);
app.use('/Voi', Voi);
app.use('/Tar', tar);
app.use('/Con', con);

app.use('/Ride',rides);

app.get('/testAggregation', async (req, res) => {
    try {
        await runAggregation();
        res.status(200).json({ message: 'Aggregation executed successfully.' });
    } catch (error) {
        console.error('Error during manual aggregation:', error);
        res.status(500).json({ message: 'Error during manual aggregation.' });
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Define an asynchronous function to start the server and initiate data synchronization

   

        // Start the server
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    


// Call the startServer function to start the server

module.exports = app;
