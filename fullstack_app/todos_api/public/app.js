/* global $ */
$(document).ready(function() {
  $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err) {
      console.log(err);
    })
  $("#todoInput").keypress(function(event) {
    if (event.which == 13) {
      createTodo();
    }
  });

  $(".list").on("click", "li", function() {
    updateTodo($(this));
  })

  $(".list").on('click', 'span', function(event) {
    event.stopPropagation();
    removeTodo($(this).parent())
  });
})

function addTodos(todos) {
  todos.forEach(function(todo) {
    appendTodo(todo);
  })
}

function appendTodo(todo) {
  var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
  newTodo.data('id', todo._id);
  newTodo.data("completed", todo.completed);

  todo.completed ? newTodo.addClass("done") : 0;

  $('.list').append(newTodo);
}

function createTodo() {
  var userInput = $("#todoInput").val();
  $.post('/api/todos', { name: userInput })
    .then(function(newTodo) {
      $("#todoInput").val('');
      appendTodo(newTodo)
    })
    .catch(function(err) {
      console.log(err);
    })
}

function removeTodo(todo) {
  var clickedId = todo.data('id');
  var deleteUrl = '/api/todos/' + clickedId;


  $.ajax({
      method: "DELETE",
      url: deleteUrl
    })
    .then(function(data) {
      todo.remove();
    })

}

function updateTodo(todo) {
  var updateUrl = '/api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = { completed: !isDone }

  $.ajax({
      method: "PUT",
      url: updateUrl,
      data: updateData
    })
    .then(() => {
      todo.toggleClass("Done");
      todo.data('completed', isDone);
    })

}
