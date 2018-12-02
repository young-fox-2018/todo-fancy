refresh()

function refresh () {
    let token = localStorage.getItem('token')
    if(token) {
        displayTodo()
        projectList()
        $('#memberList').html('')
        $('#activityList').html('')
        $('#loginPage').hide()
        $('#afterLogin').show()
    } else {
        $('#afterLogin').hide()
        $('#loginPage').show()
    }
}

function displayTodo () {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/todo/findAll',
        data: {
            id: localStorage.getItem('id')
        }
    })
    .done(data => {
        $('#todoList').html('')
        data.data.forEach(e => {
            $('#todoList').append(`<a href="#x" onclick='description("${e._id}")' class="list-group-item list-group-item-action">${e.activity}</a>`)     
        });   
    })
    .fail(err => {
        alert(err)
    })
}

$('#loginForm').submit((event) => {
    event.preventDefault()
    let email = $('#emailLogin').val()
    let password = $('#passwordLogin').val()
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/users/login',
        data: {
            email: email,
            password: password
        }
    })
    .done(data => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('id', data.id)
        localStorage.setItem('email', email)
        refresh()
    })
    .fail(err => {
        alert(err.responseJSON.msg)
    })
})

$('#registerForm').submit((event) => {
    event.preventDefault()
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/users/register',
        data: {
            email: email,
            password: password
        }
    })
    .done(data => {
        $('#close').trigger('click')
        alert('success register, now you can login')
    })
    .fail(err => {
        alert(err.responseJSON.msg)
    })
})

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    let email = profile.getEmail()
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/googlelogin',
        data: {
            email: email
        }
    })
    .done(data => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', data.email)
        localStorage.setItem('id', data.id)
        refresh()
    })
    .fail(err => {
        console.log(err)
    })
}

$('#logout').click(() => {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear()
    refresh()
})

$('#createTodoForm').submit((event) => {
    event.preventDefault()
    let id = localStorage.getItem('id')
    let activity = $('#activityTodo').val()
    let description = $('#descriptionTodolist').val()
    let due_date = $('#dateTodo').val()
    console.log(description)
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/todo/create',
        data: {
            userId: id,
            activity: activity,
            description: description,
            due_date: new Date(due_date)
        }
    })
    .done(data => {
        $('#todoList').append(`<a href="#x" onclick='description("${data.data._id}")' class="list-group-item list-group-item-action">${data.data.activity}</a>`)
        $('#closeTodo').trigger('click')
    })
    .fail(err => {
        console.log(err)
        alert(err)
    })
})

function description (id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/todo/findById',
        data: {
            id: id
        }
    })
    .done(data => {
        console.log(data)
        let status = null
        status = data.data.status? 'success' : 'danger';
        $('#descriptionTodo').html(`<center><h3>${data.data.description}</h3><br><h5>due date: ${moment(data.data.due_date).format('MMMM Do YYYY')}</h5><br>
        <button type="button" class="btn btn-${status}" onclick='statusTodo("${data.data._id}", ${data.data.status})'>Status</button><br><br>
        <button type="button" class="btn btn-warning" onclick='deleteTodo("${data.data._id}")'>Delete</button></center>`)
    })
    .fail(err => {
        alert(err)
    })
}

function statusTodo (id, status) {
    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/todo/${id}`,
        data: {
            status: !status
        }
    })
    .done(data => {
        description(id)
    })
    .fail(err => {
        alert(err)
    })
}

function deleteTodo (id) {
    console.log(id)
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/todo/${id}`,
    })
    .done(data => {
        displayTodo()
        $('#descriptionTodo').html('')
    })
    .fail(err => {
        console.log(err)
        alert(err)
    })
}

function projectList () {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/project/find',
        data: {
            userId: localStorage.getItem('id')
        }
    })
    .done(data => {
        console.log(data)
        $('#projectList').html('')
        data.data.forEach(element => {
            element.projectId.forEach(e => {
                $('#projectList').append(`<button type='button' onclick='projectClick("${e._id}")' class="list-group-item list-group-item-action">${e.projectName}</button>`)
            });    
        });
    })
    .fail(err => {
        console.log(err)
        alert(err)
    })
}

function projectClick (id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/project/findMember',
        data: {
            id: id
        }
    })
    .done(data => {
        console.log(data)
        $('#memberList').html('')
        data.data.userId.forEach(e => {
            $('#memberList').append(`<a class="list-group-item list-group-item-action">${e.email}</a>`)
        });
        $('#memberList').append(`<center>
        <form id='inviteMember' class='mt-3'>
        <input class="form-control" type="email" id="inviteEmail" required>
        <button type="button" onclick="inviteMember('${id}')" class="btn btn-primary m-3">Invite Member</button>
        </form>
        </center>`)
        $('#activityList').html('')
        data.data.activity.forEach(e => {
            $('#activityList').append(`<a class="list-group-item list-group-item-action">${e}</a>`)
        });
        $('#activityList').append(`<center>
        <input class="form-control mt-3" id="activityInput" required>
        <button type="button" class="btn btn-primary m-3" onclick="createActivity('${id}')">Create Activity</button>
        </center>`)
        
    })
    .fail(err => {
        alert(err)
    })
}

function getId (projectId) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/users/findByEmail',
        data: {
            email: $('#inviteEmail').val()
        }
    })
    .done(data => {
        $.ajax({
            type: 'PUT',
            url: `http://localhost:3000/project/updateUser/${projectId}`,
            data: {
                userId: data.data._id
            }
        })
        .done(dataUpdate => {
            projectClick(projectId)
        })
        .fail(err => {
            alert(err)
        })

    })
    .fail(err => {
        console.log(err)
    })
}

function inviteMember (id) {
    let email = $('#inviteEmail').val()
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/users/inviteProject',
        data: {
            email: email,
            projectId: id
        }
    })
    .done(data => {
        getId(id)
    })
    .fail(err => {
        console.log(err)
        // alert(err)
    })
    
}

function addProjectUser (id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/users/addProject',
        data: {
            id: localStorage.getItem('id'),
            projectId: id
        }
    })
    .done(data => {

    })
    .fail(err => {
        console.log(err)
        alert(err)
    })
}

$('#createProjectForm').submit((event) => {
    event.preventDefault()
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/project/create',
        data: {
            projectName: $('#nameProject').val(),
            userId: localStorage.getItem('id')
        }
    })
    .done(data => {
        addProjectUser(data.data._id)
        $('#projectList').append(`<button type='button' onclick='projectClick("${data.data._id}")' class="list-group-item list-group-item-action">${data.data.projectName}</button>`)
        $('#closeProject').trigger('click')
    })
    .fail(err => {
        alert(err)
    })
})

function createActivity (id) {
    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/project/addActivity/${id}`,
        data: {
            id: id,
            activity: $('#activityInput').val()
        }
    })
    .done(data => {
        projectClick(id)
        console.log(data)
    })
    .fail(err => {
        console.log(err)
    })
}