/** importing dependencies */
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
dotenv.config()
/** importing routes |  */
import api from './api/routes/api.route.js'
import page from './api/routes/page.route.js'
import initGooglePassport from './api/config/googlePassport.js'

/** initializing google passport */
initGooglePassport(passport)

/** app config */
const app = express()
/** middlewares */

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

/** initializing passport */
app.use(passport.initialize())

app.set('view engine', 'ejs')
// bootstrap (css, js and jquery) middlewares
app.use('/css', express.static('node_modules/bootstrap/dist/css'))
app.use('/js', express.static('node_modules/bootstrap/dist/js'))
app.use('/js', express.static('node_modules/jquery/dist'))
// mdbootstrap (css, js) middle ware
app.use('/mdb/css', express.static('node_modules/mdbootstrap/css'))
app.use('/mdb/js', express.static('node_modules/mdbootstrap/js'))

app.use('/api', api)
app.use('/', page)

mongoose.connect(process.env.DATABASE_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(process.env.PORT, 'localhost', () =>{
    console.log(`listening on port: ${process.env.PORT}`)
})