checkLogin()

$(document).ready(function() {
    $('#dateAddTodo').datepicker({
        uiLibrary: 'bootstrap4'
    });
    $('#dateEditTodo').datepicker({
        uiLibrary: 'bootstrap4'
    });
})


$('#addTodoForm').submit(function(event){
    event.preventDefault()
    
    let url = 'http://localhost:3000/todos'
    let data = {
        name: $('#nameAddTodo').val(),
        description: $('#descAddTodo').val(),
        dueDate: new Date($('#dateAddTodo').val())
    }
    let token = localStorage.token

    $.ajax({
        method: "POST",
        url: url,
        data: data,
        headers: { auth: token}
    })
    .done((result_todo) => {
        getTodo()
        console.log(result_todo)
    })
    .fail((err) => {
        console.log(err.responseJSON.message)
    })

    $('#addTodoModal').modal('toggle');
})

$('#loginPage').submit(function(event){
    event.preventDefault()

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
            email: $('#email').val(),
            password: $('#password').val()
        }
    })
    .done((data) => {
        console.log(data.token)
        localStorage.token = data.token
        checkLogin()
    })
    .fail((err) => {
        console.log(err.responseJSON.message)
        
        let msg = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <p id="textAlertLogin">${err.responseJSON.message}</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>`

        $('#alertLogin').html(msg)
    })
})

$('#registerForm').submit(function(event){
    event.preventDefault()

    let url = 'http://localhost:3000/register'
    let data = {
        name: $('#nameRegister').val(),
        email: $('#emailRegister').val(),
        password: $('#passwordRegister').val()
    }
    // console.log(data)

    if ($('#passwordRegister').val() !== $('#confirmRegister').val()) {
        console.log('testing')
        let msg = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <p id="textAlertLogin">Password and confirm password must be same</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>`

        $('#alertRegister').html(msg)

    } else {
        $.ajax({
            method: "POST",
            url: url,
            data: data
        })
        .then((result_user) => {
            // console.log('masuk berhasil')
            let msg = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <p id="textAlertLogin">Successfully registered new account</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>`
            checkLogin()
            $('#alertLogin').html(msg)
        }).catch((err) => {
            let msg = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <p id="textAlertLogin">${err.responseJSON.message}</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>`

            $('#alertRegister').html(msg)
        });
    }

})

function checkLogin() {
    let token = localStorage.token
    console.log(token)
    if (!token) {
        $('#loginPage').show()
        $('#registerPage').hide()
        $('#mainPage').hide()
    } else {
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/users",
            headers: { auth: token}
        })
        .done(function( data ) {
            // console.log(data)
            if (data) {
                $('#loginPage').hide()
                $('#registerPage').hide()
                $('#mainPage').show()
            }
        })
        .fail((err) => {
            console.log({
                message: err.responseJSON.message
            })


            let msg = `<div class="alert alert-daner alert-dismissible fade show" role="alert">
            <p id="textAlertLogin">${err.responseJSON.message}</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>`
            checkLogin()
            $('#alertLogin').html(msg)
        })
    }
}

function registerPage () {
    $('#loginPage').hide()
    $('#registerPage').show()
    $('#mainPage').hide()
}

function logOut() {
    localStorage.clear()
    signOutGoogle()
    checkLogin()
}

function signOutGoogle() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }


function onSuccess(googleUser) {
    // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    let id_token = googleUser.getAuthResponse().id_token;
    let url = `http://localhost:3000/users/?token=${id_token}`
    // console.log(url)
    $.ajax({
        method: "GET",
        url: url
    }).then((result) => {
        localStorage.token = result.token
        // console.log(result)
        checkLogin()
    }).catch((err) => {
        console.log(err.responseJSON.message)
    });
    
}
function onFailure(error) {
    console.log(error);
}

function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

getTodo()
function getTodo(status = 'all') {
    let url = 'http://localhost:3000/todos'
    // console.log(status)  
    if (status === 'all') {
        
        $.ajax({
            method: "GET",
            url: url,
            headers: {
                Auth: localStorage.token
            }
        }).then((result) => {
            // console.log(result.todos)
            $('#listTodos').children('tbody').empty()
            $.each(result.todos, function(i, val) {
                // console.log(val)
                let disabled = ''
                if (val.status) {
                    disabled = 'disabled'
                }

                $('#listTodos').children('tbody').append(`<tr>
                <td>
                ${val.name}
                </td>
                <td>
                ${val.description}
                </td>
                <td>
                ${new Date(val.dueDate).toDateString()}
                </td>
                <td>
                <a href="#" class="btn btn-success btn-sm ${disabled}" onclick="finishTodo('${val._id}')">Finish</a>
                <a href="#" class="btn btn-warning btn-sm" onclick="editTodo('${val._id}')">Update</a>
                <a href="#" class="btn btn-danger btn-sm" onclick="confirm('Are you sure delete this todo?');deleteTodo('${val._id}')">Delete</a>
                </td>
                </tr>`)
            })
        }).catch((err) => {
            console.log(err.responseJSON.message)
        });
    } else if (status === 'finish') {
        $.ajax({
            method: "GET",
            url: url,
            headers: {
                Auth: localStorage.token
            }
        })
        .done(result => {
            // console.log(data_todo)
            $('#listTodos').children('tbody').empty()
            $.each(result.todos, function(i, val) {
                if (val.status) {
                    // console.log(val)
                    let disabled = ''
                    if (val.status) {
                        disabled = 'disabled'
                    }

                    $('#listTodos').children('tbody').append(`<tr>
                    <td>
                    ${val.name}
                    </td>
                    <td>
                    ${val.description}
                    </td>
                    <td>
                    ${new Date(val.dueDate).toDateString()}
                    </td>
                    <td>
                    <a href="#" class="btn btn-success btn-sm ${disabled}" onclick="finishTodo('${val._id}')">Finish</a>
                    <a href="#" class="btn btn-warning btn-sm" onclick="editTodo('${val._id}')">Update</a>
                    <a href="#" class="btn btn-danger btn-sm" onclick="confirm('Are you sure delete this todo?');deleteTodo('${val._id}')">Delete</a>
                    </td>
                    </tr>`)
                }
            })
        })
        .fail(err => {
            console.log(err.responseJSON.message)
        })
    } else if (status === 'unfinish') {
        $.ajax({
            method: "GET",
            url: url,
            headers: {
                Auth: localStorage.token
            }
        })
        .done(result => {
            // console.log(data_todo)
            $('#listTodos').children('tbody').empty()
            $.each(result.todos, function(i, val) {
                if (!val.status) {
                    // console.log(val)
                    let disabled = ''
                    if (val.status) {
                        disabled = 'disabled'
                    }

                    $('#listTodos').children('tbody').append(`<tr>
                    <td>
                    ${val.name}
                    </td>
                    <td>
                    ${val.description}
                    </td>
                    <td>
                    ${new Date(val.dueDate).toDateString()}
                    </td>
                    <td>
                    <a href="#" class="btn btn-success btn-sm ${disabled}" onclick="finishTodo('${val._id}')">Finish</a>
                    <a href="#" class="btn btn-warning btn-sm" onclick="editTodo('${val._id}')">Update</a>
                    <a href="#" class="btn btn-danger btn-sm" onclick="confirm('Are you sure delete this todo?');deleteTodo('${val._id}')">Delete</a>
                    </td>
                    </tr>`)
                }
            })
        })
        .fail(err => {
            console.log(err.responseJSON.message)
        })
    }
}

function deleteTodo(id) {
    console.log(id)
    let url = `http://localhost:3000/todos/${id}`
    $.ajax({
        method: "DELETE",
        url: url,
        headers: {
            Auth: localStorage.token
        }
    })
    .then((result_todo) => {
        console.log(result_todo)
        getTodo()
    }).catch((err) => {
        console.log(err.responseJSON.message)
    });
}

function finishTodo(id) {
    let url = `http://localhost:3000/todos/finish/${id}`
    $.ajax({
        method: "PATCH",
        url: url,
        headers: {
            Auth: localStorage.token
        }
    })
    .done(result_todo => {
        console.log(result_todo)
        getTodo()
    })
    .fail(err => {
        console.log(err.responseJSON.message)
    })
}

function editTodo(id) {
    // alert('hai hai')
    let url = 'http://localhost:3000/todos/'+id
    
    $.ajax({
        method: "GET",
        url: url,
        headers: {
            Auth: localStorage.token
        }
    })
    .done(result_todo => {
        console.log(result_todo)
        let dueDate = new Date(result_todo.dueDate)
        $('#idEditTodo').val(result_todo._id)
        $('#nameEditTodo').val(result_todo.name)
        $('#descEditTodo').val(result_todo.description)
        $('#dateEditTodo').val(`${dueDate.getMonth()+1}/${dueDate.getDate()}/${dueDate.getFullYear()}`)
        
    })
    .fail(err => {
        console.log(err)
    })

    $('#editTodoModal').modal('toggle');   
}

$('#editTodoForm').submit(function(event){
    event.preventDefault()

    let url = 'http://localhost:3000/todos/'+$('#idEditTodo').val()
    let data = {
        name: $('#nameEditTodo').val(),
        description: $('#descEditTodo').val(),
        dueDate: new Date($('#dateEditTodo').val())
    }

    $.ajax({
        method: "PUT",
        url: url,
        data: data,
        headers: {
            Auth: localStorage.token
        }
    }) 
    .done(result_todo => {
        console.log(result_todo)
        alert('Successfully updated todo')
    })
    .fail(err => {
        console.log(err)
    })   
    $('#editTodoModal').modal('toggle');   
    getTodo()
})