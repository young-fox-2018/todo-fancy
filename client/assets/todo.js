
function signout() {
  localStorage.clear()
  window.location = '../index.html'
}

function listTodo() {
  let token = localStorage.getItem('token')
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/task',
    headers: {
      'Authorization': `${token}`
    },
    dataType: 'json'
  })
    .done(result => {
      console.log("hasilnyaaa")
      let todoList = result.task[0].todoList
      console.log(todoList)
      $('#listTodo').empty()
      let i = 1
      todoList.forEach(e => {
        $('#listTodo').append(`<h4>${i}.${e.title} - ${e.description}<small><a href="#" onclick="editList('${e._id}')"> Edit </a> | <a href="/#" onclick="deleteList('${e._id}')">Delete</a></td></small></h4><br> `)
        i++
      });
    })
    .fail(err => {
      console.log(err)
    })
}

function editList(id) {
  window.location = 'edit.html'
  
  let title = $('#editTitle').val()
  let description = $('#editDescription').val()
  let dueDate = $('#editdueDate').val()
  let token = localStorage.getItem('token')

  $.ajax({
    type: "put",
    url: 'http://localhost:3000/task',
    data: {
      id, title, description, dueDate, token
    },
    headers: {
      'Authorization': `${token}`
    },
    dataType: 'json'
  })
    .done(result => {
      console.log(result)
      listTodo()
      window.location = 'todoo.html'
    })
    .fail(err => {
      console.log(err)
    })
  }

function createTodo() {
  let title = $('#todoTitle').val()
  let description = $('#todoDescription').val()
  let dueDate = $('#dueDate').val()
  let token = localStorage.getItem('token')
  // console.log(token)
  // console.log([title,description,dueDate])
  $.ajax({
    type: "post",
    url: 'http://localhost:3000/task',
    data: {
      title, description, dueDate, token
    },
    headers: {
      'Authorization': `${token}`
    },
    dataType: 'json'
  })
    .done(result => {
      console.log(result)
      listTodo()
    })
    .fail(err => {
      console.log(err)
    })
}

function deleteList(id) {
  let token = localStorage.getItem('token')
  $.ajax({
    type: "delete",
    url: 'http://localhost:3000/task',
    data: {
      id, token
    },
    headers: {
      'Authorization': `${token}`
    },
    dataType: 'json'
  })
    .done(result => {
      console.log(result)
      listTodo()
      window.location = 'todoo.html'
    })
    .fail(err => {
      console.log(err)
    })
}