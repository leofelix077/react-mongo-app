var db = require('../models');

exports.getTodos = function(req, res) {
    db.Todo.find()
        .then(function(todos) {
            res.json(todos);
        })
        .catch(function(err) {
            res.send(err);
        })
}

exports.createTodo = function(req, res) {
    db.Todo.create(req.body)
        .then(function(newTodo) {
            res.status(201).json(newTodo);
        }).catch(function(err) {
            res.send(err);
        })
}

exports.getTodoById = function(req, res) {
    db.Todo.findById(req.params.todoId)
        .then(function(foundTodo) {
            res.json(foundTodo);
        })
        .catch(function(err) {
            res.send(err);
        })
}

exports.updateTodoById = function(req, res) {
    db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
        .then(function(updatedTodo) {
            res.json(updatedTodo);
        })
        .catch(function(err) {
            res.send(err);
        })
}

exports.deleteTodo = function(req, res) {
    db.Todo.remove({ _id: req.params.todoId })
        .then(function() {
            req.json({ message: "Id for Todo Deleted" })
        })
        .catch(function(err) {
            res.send(err);
        })
}

module.exports = exports;
