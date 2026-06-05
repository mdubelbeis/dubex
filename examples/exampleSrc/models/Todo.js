import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
