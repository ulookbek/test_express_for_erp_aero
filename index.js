import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

import bodyParser from 'body-parser'
import router from './src/app.controller.js'
import errorMiddleware from './middlewares/error.js'

import sequelize from './db'

const app = express()
app.use(bodyParser.json())
app.use('/api', router)
app.use(errorMiddleware)
;(async function runApp() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(3003, () => console.log(`App listening on port ${3003}`))
    } catch (e) {
        console.log(e)
    }
})()
