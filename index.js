const express = require('express')
const router = require('./src/route/router.js')

const app = express()
const port = 3000

app.set('views', './src/view')
app.set('view engine', 'ejs')

app.use("/", )

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
