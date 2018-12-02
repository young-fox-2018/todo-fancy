$(document).on('click', '.view', function() {
    detailTask($(this).attr('id'));
});

$('#myModal').on('show.bs.modal', function (e) {
    let button = $(e.relatedTarget);

    let taskid = button.data('taskid');
    let name = button.data('name');
    let description = button.data('description');
    let due_date = button.data('due_date');
    let datamodal = button.data('datamodal');

    if (datamodal === 'add') {
        $('.modal-header').text('Add Task');
        $('.modal-body').html(`
            <div class="form-group row">
                <label class="col-sm-3 col-form-label">Name</label>
                <label class="col-sm-1 col-form-label">:</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="name" />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label">Description</label>
                <label class="col-sm-1 col-form-label">:</label>
                <div class="col-sm-8">
                    <textarea class="form-control" id="description"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label">Due Date</label>
                <label class="col-sm-1 col-form-label">:</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" id="due_date" />
                </div>
            </div>
        `);
        $('.button-footer').html(`
            <span id="loadingSaveTask"></span>
            <button type="button" class="btn btn-outline-primary" onclick="saveTask()">Save</button>
        `);
    } else if (datamodal === 'edit') {
        $('.modal-header').text('Edit Task');
        $('.modal-body').html(`
            <div class="form-group row">
                <label class="col-sm-3 col-form-label">Name</label>
                <label class="col-sm-1 col-form-label">:</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="name" value="${name}" />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label">Description</label>
                <label class="col-sm-1 col-form-label">:</label>
                <div class="col-sm-8">
                    <textarea class="form-control" id="description">${description}</textarea>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label">Due Date</label>
                <label class="col-sm-1 col-form-label">:</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" id="due_date" value="${due_date}" />
                </div>
            </div>
        `);
        $('.button-footer').html(`
            <span id="loadingEditTask"></span>
            <button type="button" class="btn btn-outline-primary">Update</button>
        `);
    } else if (datamodal === 'delete') {
        $('.modal-header').text('Are You Sure Delete Task ?');
        $('.modal-body').html(`
            <table>
                <tr>
                    <td>Id</td>
                    <td>:</td>
                    <td>${taskid}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>${name}</td>
                </tr>
            </table>
        `);
        $('.button-footer').html(`
            <span id="loadingDeleteTask"></span>
            <button type="button" class="btn btn-outline-primary" onclick="deleteTask('${taskid}')">Delete</button>
        `);
    } else if (datamodal === 'addProject') {
        $('.modal-header').text('Add Project');
        $('.modal-body').html(`
            <div class="form-group row">
                <label class="col-sm-3 col-form-label">Name</label>
                <label class="col-sm-1 col-form-label">:</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="name" />
                </div>
            </div>
        `);
        $('.button-footer').html(`
            <span id="loadingSaveProject"></span>
            <button type="button" class="btn btn-outline-primary" onclick="saveProject()">Save</button>
        `);
    }
});

function cekToken() {
    $('#loadBody').load('_login.html');
    let token = localStorage.getItem('token-todo-fancy');
    if (token) {
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users/token-check/${token}`,
        })
            .done(function(response) {
                $('#headerEmail').text(response.email);
                $('.button-login').hide();
                $('.button-logout').show();
                $('#loadBody').load('_body.html', function() {
                    getTask();
                    getProject();
                });
            })
            .fail(function(error) {
                $('#errorToken').text(error.responseJSON.message);
                $('#errorToken').fadeIn();
            });
    };
}

function saveTask() {
    $('#loadingSaveTask').html('<img src="./loading.gif" />');
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/tasks',
        data: {
            name : $("#name").val(),
            description : $("#description").val(),
            due_date : $("#due_date").val(),
        },
        headers: {
            token: localStorage.getItem('token-todo-fancy'),
        }
    })
        .done(function(response) {
            $('#myModal').modal('hide');
            getTask();
        })
        .fail(function(error) {
            console.log(error);
        });
}

function saveProject() {
    $('#loadingSaveProject').html('<img src="./loading.gif" />');
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/projects',
        data: {
            name : $("#name").val(),
        },
        headers: {
            token: localStorage.getItem('token-todo-fancy'),
        }
    })
        .done(function(response) {
            $('#myModal').modal('hide');
            getProject();
        })
        .fail(function(error) {
            console.log(error);
        });
}

function deleteTask(taskid) {
    $('#loadingDeleteTask').html('<img src="./loading.gif" />');
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/tasks/${taskid}`,
    })
        .done(function(response) {
            $('#myModal').modal('hide');
            getTask();
        })
        .fail(function(error) {
            console.log(error);
        });
}

function getTask() {
    $('#listTask').html('<img src="./loading.gif" />');
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/tasks',
        headers: {
            token: localStorage.getItem('token-todo-fancy'),
        }
    })
        .done(function(response) {
            let data = '';
            for(let i = 0; i < response.length; i++) {
                let due_date = new Date(response[i].due_date).toDateString();
                data += `
                    <div class="card mb-3">
                        <div class="card-header">
                            ${response[i].name}
                            <div><small><b>Due Date : ${due_date}</b></small></div>
                        </div>
                        <div class="p-2">
                            <button class="btn btn-sm btn-outline-primary view" id="${response[i]._id}">
                                <i class="fa fa-id-card"> View</i>
                            </button>
                            <button
                                class="btn btn-sm btn-outline-warning"
                                data-toggle="modal"
                                data-target="#myModal"
                                data-datamodal="edit"
                                data-taskid="${response[i]._id}"
                                data-name="${response[i].name}"
                                data-name="${response[i].description}"
                                data-name="${response[i].due_date}"
                            >
                                <i class="fa fa-edit"> Edit</i>
                            </button>
                            <button
                                class="btn btn-sm btn-outline-danger"
                                data-toggle="modal"
                                data-target="#myModal"
                                data-datamodal="delete"
                                data-taskid="${response[i]._id}"
                                data-name="${response[i].name}"
                            >
                                <i class="fa fa-trash"> Delete</i>
                            </button>
                        </div>
                    </div>
                `;
            }
            $("#listTask").html(data);
        })
        .fail(function(error) {
            console.log(error);
        });
}

function getProject() {
    $('#listProject').html('<img src="./loading.gif" />');
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/projects',
        headers: {
            token: localStorage.getItem('token-todo-fancy'),
        }
    })
        .done(function(response) {
            console.log(response)
            let data = '';
            for(let i = 0; i < response.length; i++) {
                let due_date = new Date(response[i].due_date).toDateString();
                data += `
                    <div class="card mb-3">
                        <div class="card-header">
                            ${response[i].name}
                        </div>
                        <div class="p-2">
                            <button class="btn btn-sm btn-outline-primary viewProject" id="${response[i]._id}">
                                <i class="fa fa-id-card"> View</i>
                            </button>
                            <button
                                class="btn btn-sm btn-outline-warning"
                                data-toggle="modal"
                                data-target="#myModal"
                                data-datamodal="edit"
                                data-Projectid="${response[i]._id}"
                                data-name="${response[i].name}"
                                data-name="${response[i].description}"
                                data-name="${response[i].due_date}"
                            >
                                <i class="fa fa-edit"> Edit</i>
                            </button>
                            <button
                                class="btn btn-sm btn-outline-danger"
                                data-toggle="modal"
                                data-target="#myModal"
                                data-datamodal="delete"
                                data-Projectid="${response[i]._id}"
                                data-name="${response[i].name}"
                            >
                                <i class="fa fa-trash"> Delete</i>
                            </button>
                        </div>
                    </div>
                `;
            }
            $("#listProject").html(data);
        })
        .fail(function(error) {
            console.log(error);
        });
}

function detailTask(TaskId) {
    $('#detailTask').html('<img src="./loading.gif" />');
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/tasks/detail/${TaskId}`,
    })
        .done(function(response) {
            $('#detailTask').html(`
                <table cellpaddding="5">
                    <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td>${response.name}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>:</td>
                        <td>${response.status}</td>
                    </tr>
                    <tr>
                        <td>Due Date</td>
                        <td>:</td>
                        <td>${response.due_date}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>:</td>
                        <td>${response.description}</td>
                    </tr>
                </table>
            `);
        })
        .fail(function(error) {
            console.log(error);
        });
}

function register() {
    $('#loadingRegister').html('<img src="./loading.gif" />');
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/register',
        data: {
            fullName : $("#fullNameRegister").val(),
            email : $("#emailRegister").val(),
            password : $("#passwordRegister").val(),
        },
    })
        .done(function(response) {
            cekToken();
        })
        .fail(function(error) {
            console.log(error);
        });
}

function login() {
    $('#loadingLogin').html('<img src="./loading.gif" />');
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data: {
            email : $("#emailLogin").val(),
            password : $("#passwordLogin").val(),
        },
    })
        .done(function(response) {
            localStorage.setItem('token-todo-fancy', response.token);
            cekToken();
        })
        .fail(function(error) {
            $('#errorToken').text(error.responseJSON.message);
            $('#errorToken').fadeIn();
            $('#loadingLogin').html('');
        });
}

function logout() {
    localStorage.removeItem('token-todo-fancy');
    $('.button-login').show();
    $('.button-logout').hide();
    cekToken();
}

function showFormRegister() {
    $('#formLogin').hide();
    $('#formRegister').fadeIn();
}