const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace('<PASSWORD>', `${process.env.DATABASE_PASSWORD}`);
//console.log(DB);

mongoose.connect(
    DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}).then(con => {
    // console.log(con.connections);
    console.log('DB Connection Successful!');
   // console.log(DB.db('NewsPortal').listCollections().toArray())
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App running on port ${port}..`);
});


