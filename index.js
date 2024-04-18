import express from 'express'
import connect from './db/connection.js'
import bootstrap from './index.router.js'

const app = express()
const port=5000

connect()
bootstrap(app,express)
app.listen(port,()=>{
    console.log(`app run in port num ${port}`);
})