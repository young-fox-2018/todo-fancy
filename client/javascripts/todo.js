const deleteTodoButton = todo => {
  let button = $('<button class="todoButton btn btn-danger float-left">Delete</button>')

  button.click(event => {
    $.ajax({
      method: 'DELETE',
      url: `http://localhost:3000/todos?id=${todo._id}`,
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    })
      .done(data => {
        getTodos()
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.log(errorThrown)
      })
  })

  return button
}

const todoButton = todo => {
  let statuses = ['TODO', 'IN PROGRESS', 'DONE']
  let button = $('<button class="todoButton btn float-right">')
  if (todo.status === 'TODO') {
    button.addClass('btn-outline-danger')
    button.text('Start')
  } else if (todo.status === 'IN PROGRESS') {
    button.addClass('btn-outline-warning')
    button.text('Finish')
  } else {
    button.addClass('btn-secondary disabled')
    button.text('Finished')
  }

  if (statuses.slice(0, 2).includes(todo.status)) {
    button.click(event => {
      $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/todos?id=${todo._id}`,
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        data: {
          status: statuses[statuses.indexOf(todo.status) + 1]
        }
      })
        .done(data => {
          getTodos()
        })
        .fail((jqXHR, textStatus, errorThrown) => {
          console.log(errorThrown)
        })
    })
  }

  return button
}

const todoTemplate = todo => {
  let cardBody = $(`<div class="card-body">
    <h2 class="card-title h4">${todo.name}</h2>
    <p class="card-text">${todo.description ? todo.description : 'No Description'}</p>
    <p class="card-text"><strong>Due Date:</strong> ${new Date(todo.dueDate).toLocaleString()}</p>
    <p class="card-text"><strong>Status:</strong> ${todo.status}</p>
    </div>`)
  cardBody.append(deleteTodoButton(todo))
  cardBody.append(todoButton(todo))
  return $('<div class="col-sm-4 p-2">').append($('<div class="card">').append(cardBody))
}

export function getTodos() {
  $.get({
    url: 'http://localhost:3000/todos',
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
    .done(data => {
      $('#todo-list').empty()
      data.response.forEach(todo => {
        $('#todo-list').append(todoTemplate(todo))
      })
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log(errorThrown)
    })
}

export default () => {

  $('#todoForm').submit(event => {
    let data = { name: $('#inputTodoName').val() }
    if ($('#inputTodoDescription').val()) data.description = $('#inputTodoDescription').val()
    if ($('#inputTodoDueDate').val()) data.dueDate = $('#inputTodoDueDate').val()

    event.preventDefault()
    $.post({
      url: 'http://localhost:3000/todos',
      headers: {
        Authorization: localStorage.getItem('token')
      },
      data
    })
      .done(data => {
        getTodos()
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.log(errorThrown)
      })
      .always(data => {
        $('#newTodoModal').modal('hide')
      })
  })
}