import Todo from "../models/Todo.js";

export const getAllTodos = async (req, res, next) => {
  const todos = await Todo.find();

  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
};

export const getTodoById = async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
};

export const createTodo = async (req, res, next) => {
  const todo = await Todo.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      todo,
    },
  });
};

export const updateTodo = async (req, res, next) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
};

export const deleteTodo = async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id)

  res.status(204).send();
};
