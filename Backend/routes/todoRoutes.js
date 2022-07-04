import express from 'express'
import Todo from '../model/todoModel.js';

const todoRouter = express.Router()

todoRouter.post('/data', async (req,res)=>{
    let todoInfo = {
        todo: req.body.todo,
    }
    const todo = await Todo(todoInfo)
    todo.save()
})

todoRouter.get('/getdata', async (req,res)=>{
    const data = await Todo.find({})
    res.send(data)
})

todoRouter.post('/delete', async (req,res)=>{
    Todo.findByIdAndDelete(req.body.id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        }
    });
})

todoRouter.get('/:id', async (req,res)=>{
    const data = await Todo.findById(req.params.id)
    res.send(data);
})

todoRouter.put('/edit', async (req,res)=>{
    let todoInfo = {
        todo: req.body.todo
    }
    Todo.findByIdAndUpdate(req.body.id, todoInfo, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
        }
    });
})
  
export default todoRouter