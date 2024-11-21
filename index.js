const connection = require("./dbConnect");
const express = require('express');
const AppController = require('./src/controller/appController');
const app = express();
const port = 3000;
const appRouter = require('./src/route/appRoutes');
app.set('views', './src/view');
app.set('view engine', 'ejs');

app.use(express.static("./public"));
app.use(express.urlencoded({
    extended: true
}));

app.use("/", appRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});