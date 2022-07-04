import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import todoRouter from './routes/todoRoutes.js';

const app = express()

dotenv.config()
mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log('mongodb connected');
})

app.use(express.json())

app.use('/api/todo', todoRouter)




app.get('/', function (req, res) {
  res.send(' World')
})

app.listen(8000,()=>{
    console.log('Port Running on 8000 port');
})