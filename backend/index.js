const { createTodo, updateTodo } = require('./types.js');
const { todo } = require('./db.js')
const cors = require("cors")

const express = require('express')
const app = express()

app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" }));

app.post("/todo", async (req,res) => {
    const userBody = req.body
    const parseUserBody = createTodo.safeParse(userBody)
    if(!parseUserBody.success){
        res.status(411).json({
            msg: "you sent the wrong inputs"
        })
        return
    }
    //put it in mongodb
    await todo.create({
        title: userBody.title,
        description: userBody.description,
        completed: false
    })

    res.json({
        msg: "todo created"
    })


})

app.get("/todos", async (req,res)=> {

    const todos = await todo.find({})
    res.json({
        todos
    })

})

app.put("/completed", async (req,res)=> {
    const createPayload = req.body
    const parsePayload = updateTodo.safeParse(createPayload)
    if(!parsePayload.success){
        res.status(411).json({
            msg: "todo not updated"
        })
        return
    }

    await todo.updateOne({
        _id: req.body.id
    },
    {
        completed: true
    })

    res.json({
        msg: "todo marked as completed"
    })


})

app.listen(3000, () => console.log("Server running on port 3000"));
