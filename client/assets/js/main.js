$(document).ready(function() {
    console.log( "ready!" );
    toggleLogin()
})


// FACEBOOK LOGIN:
window.fbAsyncInit = function() {
    FB.init({
        appId      : '123745098532524',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
    });
        
    FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            let fbToken = response.authResponse.accessToken
            fbLogin(fbToken)
        }
        else {
            console.log('not connected');
        }
    });
}


function fbLogin(fbToken) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/fbLogin',
        data: {
            fbToken: fbToken
        }
    })
        .done( response => {
            localStorage.setItem('accesstoken', response.accesstoken)
            toggleLogin()  
        })
        .fail( err => {
            console.log(err);
        })
}


function toggleLogin() {
    let accesstoken = localStorage.getItem('accesstoken')
    if (accesstoken) {
        console.log('accesstoken exist');
        getTasks()
        getProjects()
        getAllUsers()
        getCompleted()
        $( "#beforeLogin" ).hide() 
        $( "#afterLogin" ).show()
        showTasks()
    }
    else {
        console.log('no accesstoken');
        $( "#beforeLogin" ).show() 
        $( "#afterLogin" ).hide()
    }
}


function showTasks() {
    $('#allTasks').show()
    $('#allProjects').hide()
    $('#allInvitations').hide()
    $("#allCompletedTasks").hide()
}

function showProjects() {
    $('#allProjects').show()
    $('#allTasks').hide()
    $('#allInvitations').hide()
    $("#allCompletedTasks").hide()
}

function showInvitations() {
    $('#allInvitations').show()
    $('#allProjects').hide()
    $('#allTasks').hide()
    $("#allCompletedTasks").hide()
}

function showCompleted() {
    $('#allInvitations').hide()
    $('#allProjects').hide()
    $('#allTasks').hide()
    $("#allCompletedTasks").show()
}

function showLogin() {
    $('#loginForm').show()
    $('#registerForm').hide()
}


function showRegister() {
    $('#loginForm').hide()
    $('#registerForm').show()
}


function getAllUsers() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/users/allUsers',
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done( response => {
            $('#inputNewMember').empty()
            $.each(response.users, function(index, value) {
                $('#inputNewMember').append(`
                    <option value="${value._id}">${value.name} (${value.email})</option>
                `)
            })
        })
        .fail( err => {
            console.log(err);
        })
}


function readInvitations() {
    showInvitations()
    $.ajax({
        url: `http://localhost:3000/users/invite`,
        method: 'GET',
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done( response => {
            $('#invitations').empty()
            $.each(response.invitations, function(index, value) {
                $('#invitations').append(`
                    <tr>
                        <td>${value.name}</td>
                        <td class="d-flex justify-content-center">
                            <button class="btn btn-round btn-outline-info btn-sm mx-2" onclick="approveInvitation('${value._id}')">Approve</button>
                            <button class="btn btn-round btn-outline-warning btn-sm mx-2" onclick="rejectInvitation('${value._id}')">Reject</button>
                        </td>
                    </tr>
                `)
            })
        })
        .fail( err => {
            console.log(err);
        })
}


function inviteNewMember() {
    let userID = $('#inputNewMember').val()
    let projectID = $('#projectIDMember').val()
    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/users/invite/${projectID}/${userID}`,
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done( response => {
            showNotification('top', 'right', response.message, 'info')
        })
        .fail( err => {
            let error = err.responseJSON.message;
            showNotification('top', 'right', error, 'info')
        })
}


function addNewProject() {
    event.preventDefault()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/projects',
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        },
        data: {
            name: $('#inputNewProject').val(),
        }
    })
        .done( response => {
            getProjects()
        })
        .fail( err => {
            console.log(err);
        })
}


function getProjects() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/projects',
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done( response => {
            $('#Projects').empty()
            
            $.each(response.projects, function (index, value) {
                $('#Projects').append(`
                    <div class="card">
                        <div class="card-header">
                            <div class="d-flex bd-highlight mb-3">
                                <div class="p-2 bd-highlight">
                                    <h5 class="card-title">${value.name}</h5>
                                </div>
                                <div class="ml-auto p-2 bd-highlight"> 
                                    <button class="btn btn-link btn-sm btn-round" onclick="modalAddNewMember('${value._id}')" > + Invite new member</button>
                                    <button class="btn btn-link btn-sm btn-round" onclick="modalAddNewTaskProject('${value._id}')" >+ Add new task</button>
                                </div>
                            </div>
                            <div>
                                <p class="ml-2">All Members: </p>
                            </div>
                            
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead class=" text-primary">
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Due Date</th>
                                        <th class="text-right">Options</th>
                                    </thead>
                                    <tbody id="taskTable-${value._id}">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `)

                readAllProjectTasks(value._id)
            })
        })
        .fail( err => {
            console.log(err);
        })
}


function readAllProjectTasks(projectID) {
    $.ajax({
        url: `http://localhost:3000/projects/${projectID}`,
        method: 'GET',
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done( response => {
            $(`#taskTable-${projectID}`).empty()
            $.each(response.tasks, function (index, value) {
                let due_date = moment(value.due_date).format('ll')
                $(`#taskTable-${projectID}`).append(`
                    <tr>
                        <td>${value.title}</td>
                        <td>${value.description}</td>
                        <td>${due_date}</td>
                        <td class="text-right">
                            <btn onclick="ModalEditTaskProject('${value._id}', '${projectID}', '${value.title}', '${value.description}')" class="btn btn-sm btn-outline-warning btn-round btn-icon" data-toggle="tooltip" data-placement="top" title="Edit Task">
                                <i class="nc-icon nc-settings" ></i>
                            </btn>
                            <btn class="btn btn-sm btn-outline-danger btn-round btn-icon" data-toggle="tooltip" data-placement="top" title="Delete Task">
                                <i class="nc-icon nc-scissors" onclick="deleteTask('${value._id}')"></i>
                            </btn>
                        </td>
                    </tr>
                `)
            })
        })
        .fail( err => {
            console.log(err);
        })
}


function ModalEditTask(taskID, title, description) {
    $('#modalEditTask').modal('show');
    $('#taskID').val(taskID)
    $('#inputEditTitle').val(title)
    $('#inputEditDescription').val(description)
}


function ModalEditTaskProject(taskID, projectID, title, description) {
    $('#modalEditTaskProject').modal('show');
    $('#taskIDProject').val(taskID)
    $('#projectIDEdit').val(projectID)
    $('#inputEditTitleProject').val(title)
    $('#inputEditDescriptionProject').val(description)
}


function modalAddNewMember(projectID) {
    $('#modalAddNewMember').modal('show');
    $('#projectIDMember').val(projectID)
}


function modalAddNewTaskProject(projectID) {
    $('#modalAddNewTaskProject').modal('show');
    $('#projectID').val(projectID)
}


function addNewTaskProject() {
    let projectID = $('#projectID').val()
    $.ajax({
        url: `http://localhost:3000/projects/${projectID}/addTask`,
        method: 'POST',
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        },
        data: {
            title: $('#inputNewTitleProject').val(),
            description: $('#inputNewDescriptionProject').val(),
            due_date: $('#inputNewDateProject').val(),
        }
    })
        .done( response => {
            getProjects()
        })
        .fail( err => {
            console.log(err);
        })
    
}


function editTaskProject() {
    let taskID = $('#taskIDProject').val()
    let projectID = $('#projectIDEdit').val()
    event.preventDefault()
        $.ajax({
            method: 'PATCH',
            url: `http://localhost:3000/projects/${projectID}/${taskID}`,
            headers: {
                accesstoken: localStorage.getItem('accesstoken')
            },
            data: {
                title: $('#inputEditTitleProject').val(),
                description: $('#inputEditDescriptionProject').val(),
                due_date: $('#inputEditDateProject').val()
            }
        })
            .done( response => {
                console.log(response);
                getProjects()
            })
            .fail( err => {
                console.log(err);
            })
}


function editTask() {
    let taskID = $('#taskID').val()
    event.preventDefault()
        $.ajax({
            method: 'PATCH',
            url: `http://localhost:3000/tasks/${taskID}`,
            headers: {
                accesstoken: localStorage.getItem('accesstoken')
            },
            data: {
                title: $('#inputEditTitle').val(),
                description: $('#inputEditDescription').val(),
                due_date: $('#inputEditDate').val()
            }
        })
            .done( response => {
                console.log(response);
                getTasks()
            })
            .fail( err => {
                console.log(err);
            })
}


function showNotification(from, align, message, color) {
    $.notify({
    icon: "nc-icon nc-bell-55",
    message: message
    }, {
    type: color,
    timer: 1000,
    placement: {
        from: from,
        align: align
    }
    });
}


function register() {
    event.preventDefault()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            name: $('#inputRegisterName').val(),
            email: $('#inputRegisterEmail').val(),
            password: $('#inputRegisterPassword').val()
        }
    })
        .done( response => {
            showNotification('top', 'right', response.message, 'primary')
        })
        .fail( err => {
            let error = err.responseJSON.err 
            console.log(error);
            showNotification('top', 'right', error, 'danger')
        })
}


function login() {
    event.preventDefault()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email: $('#inputLoginEmail').val(),
            password: $('#inputLoginPassword').val()
        }
    })
        .done( response => {
            localStorage.setItem('accesstoken', response.accesstoken)
            toggleLogin()
        })
        .fail( err => {
            console.log(err);
        })
}


function logout() {
    localStorage.removeItem('accesstoken')
    toggleLogin()
}


function getTasks() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/tasks/pending',
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done( response => {
            $('#taskTable').empty()
            $.each(response.tasks, function (index, value) {
                let due_date = moment(value.due_date).format('ll')
                $('#taskTable').append(`
                    <tr>
                        <td>${value.title}</td>
                        <td>${value.description}</td>
                        <td>${due_date}</td>
                        <td class="text-right">
                            <btn class="btn btn-sm btn-outline-success btn-round btn-icon" data-toggle="tooltip" data-placement="top" title="Mark as Done">
                                <i class="nc-icon nc-check-2" onclick="markAsDone('${value._id}')"></i>
                            </btn>
                            <btn onclick="ModalEditTask('${value._id}', '${value.title}', '${value.description}')" class="btn btn-sm btn-outline-warning btn-round btn-icon" data-toggle="tooltip" data-placement="top" title="Edit Task">
                                <i class="nc-icon nc-settings" ></i>
                            </btn>
                            <btn class="btn btn-sm btn-outline-danger btn-round btn-icon" data-toggle="tooltip" data-placement="top" title="Delete Task">
                                <i class="nc-icon nc-scissors" onclick="deleteTask('${value._id}')"></i>
                            </btn>
                        </td>
                    </tr>
                `)
            })
        })
        .fail( err => {
            console.log(err);
        })
}


function addNewTask() {
    event.preventDefault()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/tasks',
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        },
        data: {
            title: $('#inputNewTitle').val(),
            description: $('#inputNewDescription').val(),
            due_date: $('#inputNewDate').val()
        }
    })
        .done( response => {
            getTasks()
        })
        .fail( err => {
            console.log(err);
        })
}


function deleteTask(taskID) {
    event.preventDefault()
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/tasks/${taskID}`,
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done( response => {
            console.log(response);
            getTasks()
            getProjects()
        })
        .fail( err => {
            console.log(err);
        })
}


function approveInvitation(projectID) {
    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/users/approve/${projectID}`,
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done( response => {
            readInvitations()
            showNotification('top', 'right', response.message, 'info')
            getProjects()
        })
        .fail( err => {
            console.log(err);
        })
}

function rejectInvitation(projectID) {
    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/users/reject/${projectID}`,
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done( response => {
            readInvitations()
            showNotification('top', 'right', response.message, 'info')
        })
        .fail( err => {
            console.log(err);
        })
}


function markAsDone(taskID) {
    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/tasks/${taskID}/done`,
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done( response => {
            console.log(response);
            getTasks()
            getCompleted()
        })
        .fail( err => {
            console.log(err);
        })
}


function getCompleted() {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/tasks/done`,
        headers: {
            accesstoken: localStorage.getItem('accesstoken')
        }
    })
        .done( response => {
            $('#completedTaskTable').empty()
            $.each(response.tasks, function (index, value) {
                let due_date = moment(value.due_date).format('ll')
                $('#completedTaskTable').append(`
                    <tr>
                        <td>${value.title}</td>
                        <td>${value.description}</td>
                        <td>${due_date}</td>
                    </tr>
                `)
            })
        })
        .fail( err => {
            console.log(err);
        })
}

