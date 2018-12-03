
$(document).ready(function () {
    cekLogin()
})

const cekLogin = () => {
    let token = localStorage.getItem('token')
    if (!token) {
        $('#formLogin').show()
        $('#formLogout').hide()
        $('#formRegister').hide()
        $('#listTodo').hide()
        $('#formTodo').hide()
    } else {
        listTodo()
        $('#formLogin').hide()
        $('#formLogout').show()
        $('#formRegister').hide()
        $('#listTodo').show()
        $('#formTodo').hide()
    }

}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response)
    });
}

function statusChangeCallback(response) {
    // console.log(response)
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/fblogin',
        dataType: 'json',
        data: {
            token: response.authResponse.accessToken
        }
    })
        .done(data => {
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.name)
            localStorage.setItem('email', data.email)
            login()
        })
    fail(err => {
        alert(err)
    })
}


const register = () => {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/register',
        data: {
            username: $('#usernameRegister').val(),
            email: $('#emailRegister').val(),
            password: $('#passwordRegister').val()
        }
    })
        .done(function (data) {
            // console.log(data)
            cekLogin()
            $('#errorLogin').empty()
        })
        .fail(function (err) {
            $('#errorRegister').empty()
            $('#errorRegister').append(`
            <span class="has-text-error alert alert-danger">${err.responseJSON.message}</span> 
            <br>
            
            `)
        })
}
const login = () => {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data: {
            email: $('#emailLogin').val(),
            password: $('#passwordLogin').val()
        }
    })
        .done(data => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            cekLogin()
        })
        .fail(err => {
            // console.log(err.responseJSON.message)
            $('#errorLogin').empty()
            $('#errorLogin').append(`
            <span class="has-text-error alert alert-danger">${err.responseJSON.message}</span>
            `)
        })
}
const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    cekLogin()
}
const addTodo = () => {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos/add',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title: $('#todoTitle').val(),
            priority: $('#todoPriority').val(),
            date: $('#todoDate').val(),
            location: $('#todoLocation').val(),
            description: $('#todoDescription').val(),
        }
    })
        .done(data => {
            $('#addModal').modal('hide')
            $('#todoTitle').val('')
            $('#todoPriority').val('')
            $('#todoDate').val('')
            $('#todoLocation').val('')
            $('#todoDescription').val('')

            $('#listTodo').show()
            $('#formTodo').hide()
            listTodo()
        })
        .fail(err => {
            console.log(err)
            $('#addModal').modal('hide')
            $('#errorAdd').empty()
            $('#errorAdd').append(`
            <span class="has-text-error alert alert-danger">${err.responseJSON.errors}</span>
            `)
        })
}
const callRegister = () => {
    $('#formRegister').show()
    $('#formLogin').hide()
    $('#errorLogin').empty()
}
const callTodo = () => {
    // console.log('form addd modal')
    $('#errorAdd').empty()
    $('#formAdd').empty()
    $('#formAdd').append(`

    <div class="container" id="formTodo">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div>
                    <div class="form-row">
                        <div class="form-group col-lg-12">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="todoTitle" placeholder="Input your title">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="priority">Priority</label>
                            <select class="form-control" id="todoPriority"> 
                                <option>Default</option>
                                <option>Urgent</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputCity">Date</label>
                            <input type="date" class="form-control" id="todoDate">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-lg-12">
                            <label for="location">Location</label>
                            <input type="text" class="form-control" id="todoLocation" placeholder="Input your location">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Description</label><br>
                            <textarea name="" cols="51" rows="10" id="todoDescription" placeholder="Please describe your TODOs here...."></textarea>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-danger" data-dismiss="modal" onClick="listTodo()">Cancel</button>
                    <button type="submit" class="btn btn-success" onClick="addTodo()">Add Todo</button>
                </div>
            </div>
        </div>
    </div> 

    `)

}

const listTodo = () => {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(data => {
            // console.log(data)
            $('#list').empty()
            data.todos.forEach((datum, index) => {
                $('#list').append(`
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${datum.title}</td>
                    <td>${datum.priority}</td>
                    <td>${datum.date.slice(0, 10)}</td>
                    <td id=${index + 1}></td> 
                    <td>${datum.description}</td>
                    <td>
                     <button data-toggle="modal" data-target="#detailModal" class="btn btn-warning" onClick="updated('${datum._id}')">Edit</button>
                     <button type="button" class="btn btn-success" data-dismiss="modal" onClick="complete('${datum._id}')">Finish</button>
                     <button type="button" class="btn btn-danger" data-dismiss="modal" onClick="deleted('${datum._id}')">Delete</button>
                    </td> 
                </tr>
                `)
                if (!datum.status) {
                    $(`#${index + 1}`).append('Incomplete')
                } else {
                    $(`#${index + 1}`).append('Complete')
                }
            })
        })
        .fail(err => {
            console.log(err)
        })
}

const callList = (todoId) => {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${todoId}`
    })
        .done(todo => {
            $('#titleDetail').empty()
            $('#titleDetail').append(todo.data.title)

            $('#createdDetail').empty()
            $('#createdDetail').append(todo.data.userId.username)

            $('#priorityDetail').empty()
            $('#priorityDetail').append(todo.data.priority)

            $('#duedateDetail').empty()
            $('#duedateDetail').append(todo.data.date)

            $('#statusDetail').empty()
            if (!todo.data.status) {
                $('#statusDetail').append('Incomplete')
            } else {
                $('#statusDetail').append('Complete')
            }
            $('#descriptionDetail').empty()
            $('#descriptionDetail').append(todo.data.description)

            $('#buttonDetail').empty()
            $('#buttonDetail').append(`
            <button type="button" class="btn btn-success" data-dismiss="modal" onClick="complete('${todoId}')">Finish</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick="deleted('${todoId}')">Delete</button>
            `)
        })
        .fail(err => {
            console.log(err)
        })
}
const complete = (todoId) => {
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/complete/${todoId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todo => {
            console.log(todo)
            listTodo()
        })
        .fail(err => {
            console.log(err)
        })
}
const deleted = (todoId) => {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/delete/${todoId}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todo => {
            console.log(todo)
            listTodo()
        })
        .fail(err => {
            console.log(err)
        })
}
const updated = (todoId) => {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${todoId}`
    })
        .done(todo => {
            console.log(todo.data)
            $('#formEdit').empty()
            $('#formEdit').append(
                `
            <div class="row justify-content-center">
            <div class="col-md-8">
                <div>
                    <div class="form-row">
                        <div class="form-group col-lg-12">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="titleEdit" value='${todo.data.title}'>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="priority">Priority</label>
                            <select class="form-control" id="priorityEdit">  
                                <option value='Default'>Default</option>
                                <option value='Urgent'>Urgent</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputCity">Date</label>
                            <input type="date" class="form-control" id="dateEdit" value='${todo.data.date.slice(0, 10)}'>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-lg-12">
                            <label for="location">Location</label>
                            <input type="text" class="form-control" id="locationEdit" value='${todo.data.location}'>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-5">
                            <label for="inputPassword4">Description</label><br>
                            <textarea name="" cols="53" rows="10" id="descriptionEdit" >${todo.data.description}</textarea>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-danger" data-dismiss="modal"  >Cancel</button>
                    <button type="submit" class="btn btn-success" data-dismiss="modal" onClick="saveEdit('${todo.data._id}')">Save</button>
                </div>
            </div>
        </div>
                `
            )
            $('#todoPriority').val(todo.data.priority)
        })
        .catch(err => {
            console.log(err)
        })
}

const saveEdit = (id) => {
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/update/${id}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title: $('#titleEdit').val(),
            priority: $('#priorityEdit').val(),
            date: $('#dateEdit').val(),
            location: $('#locationEdit').val(),
            description: $('#descriptionEdit').val()
        }
    })
        .done(todo => {
            console.log(todo)
            listTodo()
        })
        .catch(err => {
            console.log(err)
        })
}












