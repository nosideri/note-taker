const express = require("express");
const app = express()

const port = process.env.PORT || 3001

app.use(express.static("public"))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const apiRoutes = require("./routes/apiRoute");

apiRoutes(app)


const htmlRoutes = require("./routes/htmlRoute");

htmlRoutes(app)





app.listen(port, function(){
    console.log("app is listening on port " + port)
})