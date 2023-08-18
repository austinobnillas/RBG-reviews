const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const port = process.env.DB_PORT;


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//require config and routes
require("./config/mongoose.config");
require("./routes/communityPCs.routes")(app);

app.listen(port, () => {
    console.log(`Server Running!`)
})