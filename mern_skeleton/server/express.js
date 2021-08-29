import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compress from 'compression'
import cors from 'cors'
import helmet from "helmet"
import Template from '../template.js'
import userRoutes from '../routes/user.routes.js'
import authRoutes from '../routes/auth.routes.js'
const app = express()

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))
app.use(compress);
app.use(helmet);
app.use(cors);
app.use('/', userRoutes)
/*... configures express ... */

app.use((err, res, next) => {
    if (err.name === "Unauthorized Error") {
        res.status(401).json({"error" : err.name + ": " + err.message})
    } else if (err) {
        res.status(400).json({"error" : err.name + err.message})
        console.log(err)
    }
})

app.get('/', (req, res) => {
    res.status(200).send(Template())
})


app.listen(3001, (err) => {
    if (err) {
      console.log(err)
    }
    console.info('Server started on port %s.', 3000)
  })
export default app