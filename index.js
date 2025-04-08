const connection = require("./dbConnect");
const express = require('express');
const cors = require('cors');
let bodyParser = require('body-parser');
const methodOverride = require('method-override');
const appRouter = require('./src/route/appRoutes');
const apiRouter = require('./src/route/apiRoutes');

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));
app.use(methodOverride('_method'));

app.set('views', './src/view');
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("./public"));
app.use(express.urlencoded({
    extended: true
}));

app.use("/", appRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});