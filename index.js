const connection = require("./dbConnect");
const express = require('express');
const app = express();
const port = 3000;
const appRouter = require('./src/route/appRoutes');
const apiRouter = require('./src/route/apiRoutes');
app.set('views', './src/view');
app.set('view engine', 'ejs');

app.use(express.static("./public"));
app.use(express.urlencoded({
    extended: true
}));

app.use("/", appRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});