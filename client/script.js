$(document).on('click', '.view', function() {
    detailTask($(this).attr('id'));
});

$(document).on('click', '.view-project', function() {
    let projectid = $(this).attr('data-projectid');
    let name = $(this).attr('data-name');
    let member = $(this).attr('data-member');
    
    dataTaskProject = '';
    let tasks = JSON.parse($(this).attr('data-tasks'));
    for(let i = 0; i < tasks.length; i++) {
        dataTaskProject += `
            <div class="card mb-2">
                <div class="card-header">
                    ${tasks[i].name}
                </div>
                <div class="p-2">
                </div>
            </div>
        `;
    };

    $('#detail').html(`
        <table>
            <tr>
                <td>Id</td>
                <td>:</td>
                <td>${projectid}</td>
            </tr>
            <tr>
                <td>Name</td>
                <td>:</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Member</td>
                <td>:</td>
                <td>${member}</td>
            </tr>
            <tr>
                <td colspan="3">
                    <button
                        class="btn btn-sm btn-outline-info"
                        data-toggle="modal"
                        data-target="#myModal"
                        data-datamodal="addMember"
                    >
                        <i class="fa fa-user"> Add Member</i>
                    </button>
                    <button
                        class="btn btn-sm btn-outline-info"
                        data-toggle="modal"
                        data-target="#myModal"
                        data-datamodal="addTaskProject"
                        data-projectid="${projectid}"
                    >
                        <i class="fa fa-arrow-alt-circle-down"> Add Task</i>
                    </button>
                </td>
            </tr>
        </table>
    `);
    $('#detailTaskProject').html(dataTaskProject);
});

$('#myModal').on('show.bs.modal', function (e) {
    let button = $(e.relatedTarget);

    let taskid = button.data('taskid');
    let name = button.data('name');
    let description = button.data('description');
    let due_date = button.data('due_date');
    let datamodal = button.data('datamodal');
    let projectid = button.data('projectid');

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
    } else if (datamodal === 'addMember') {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/users',
            headers: {
                token: localStorage.getItem('token-todo-fancy'),
            }
        })
            .done(function(response) {
                users = '';
                for(let i = 0; i < response.length; i++) {
                    users += `<option value="${response[i]._id}">${response[i].email}</option>`;
                };
                $('.modal-header').text('Add Member');
                $('.modal-body').html(`
                    <select class="form-control" id="MemberId">
                        <option value="">- Choose User -</option>
                        ${users}
                    </select>
                `);
                $('.button-footer').html(`
                    <span id="loadingSaveMember"></span>
                    <button type="button" class="btn btn-outline-primary" onclick="saveMember()">Save</button>
                `);
                    })
            .fail(function(error) {
                console.log(error);
            });
    } else if (datamodal === 'addTaskProject') {
        $('.modal-header').text('Add Task Project');
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
            <span id="loadingSaveTaskProject"></span>
            <button type="button" class="btn btn-outline-primary" onclick="saveTaskProject('${projectid}')">Save</button>
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

function saveTaskProject(projectid) {
    $('#loadingSaveTaskProject').html('<img src="./loading.gif" />');
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/tasks/projects',
        data: {
            name : $("#name").val(),
            description : $("#description").val(),
            due_date : $("#due_date").val(),
            ProjectId: projectid,
        },
        headers: {
            token: localStorage.getItem('token-todo-fancy'),
        }
    })
        .done(function(response) {
            $('#myModal').modal('hide');
            getTaskProject(projectid);
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

function saveMember() {
    $('#loadingSaveMember').html('<img src="./loading.gif" />');
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/projects/add-member',
        data: {
            UserId : $("#MemberId").val(),
        },
        headers: {
            token: localStorage.getItem('token-todo-fancy'),
        }
    })
        .done(function(response) {
            $('#myModal').modal('hide');
            console.log(response)
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

function getTaskProject(projectid) {
    $('#detailTaskProject').html('<img src="./loading.gif" />');
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/projects/get-tasks-projects/${projectid}`,
        headers: {
            token: localStorage.getItem('token-todo-fancy'),
        }
    })
        .done(function(response) {
            dataTaskProject = '';
            let tasks = response.tasks;
            for(let i = 0; i < tasks.length; i++) {
                dataTaskProject += `
                    <div class="card mb-2">
                        <div class="card-header">
                            ${tasks[i].name}
                        </div>
                        <div class="p-2">
                        </div>
                    </div>
                `;
            };
            $('#detailTaskProject').html(dataTaskProject);
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
            let data = '';
            for(let i = 0; i < response.length; i++) {
                let member = '';
                for(let j = 0; j < response[i].member.length; j++) {
                    member += response[i].member[j].email + ', ';
                };
                let tasks = JSON.stringify(response[i].tasks);
                data += `
                    <div class="card mb-3">
                        <div class="card-header">
                            ${response[i].name}
                        </div>
                        <div class="p-2">
                            <button
                                class="btn btn-sm btn-outline-primary view-project"
                                data-projectid="${response[i]._id}"
                                data-name="${response[i].name}"
                                data-member="${member}"
                                data-tasks='${tasks}'
                            >
                                <i class="fa fa-id-card"> View</i>
                            </button>
                            <button
                                class="btn btn-sm btn-outline-warning"
                                data-toggle="modal"
                                data-target="#myModal"
                                data-datamodal="edit"
                                data-projectid="${response[i]._id}"
                                data-name="${response[i].name}"
                            >
                                <i class="fa fa-edit"> Edit</i>
                            </button>
                            <button
                                class="btn btn-sm btn-outline-danger"
                                data-toggle="modal"
                                data-target="#myModal"
                                data-datamodal="delete"
                                data-projectid="${response[i]._id}"
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
    $('#detail').html('<img src="./loading.gif" />');
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/tasks/detail/${TaskId}`,
    })
        .done(function(response) {
            $('#detail').html(`
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