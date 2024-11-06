require('dotenv').config();

const mongoose = require("mongoose")


const uri = process.env.MONGO_URI;
// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB:", err));


const { Schema } = mongoose;


const todoSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model("Todo", todoSchema);

module.exports = { todo };