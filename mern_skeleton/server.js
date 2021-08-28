import config from "./config/config.js";
import app from './server/express.js'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true     
});

mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: {mongoUri}`)
});

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
});