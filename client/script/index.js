


function cekLogin() {
    let token = localStorage.getItem("token")
    if (token) {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/users",
            headers: {
                token: token
            }
        })
            .done((user) => {
                // console.log(user);
                content()
                task()

            })
            .fail((err) => {

                logout()
            })

    } else {
        formLogin()
    }
}
$(document).ready(
    cekLogin()
)
function register() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/users/register",
        data: {
            name: $("#name").val(),
            email: $("#email").val(),
            password: $("#password").val()
        }
    })
        .done((data) => {

            $("#error_login").html("")
            $("#error_register").html("")
            $("#error_register").append(`

            <div class="ui success message mini">
             <p>Registered succes You must log in first</p>
             </div>
         `
            )
        })
        .fail((err) => {

            $("#error_register").html("")
            $("#error_register").append(`

               <div class="ui error message mini">
                <p>${err.responseJSON.err.errors.email.message}</p>
                <p>${err.responseJSON.err.errors.name.message}</p>
                </div>
            `
            )
        })
}
////////

FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
});

function statusChangeCallback(data) {

    $.ajax({
        type: "GET",
        json: true,
        url: `http://localhost:3000/users/fblogin?acces_token=${data.authResponse.accessToken}`,
    })
        .done((data) => {
            console.log(data);
            localStorage.setItem("token", data.token)
            cekLogin()
        })
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}




//////////
function login() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/users/login",
        data: {
            email: $("#emailLogin").val(),
            password: $("#passwordLogin").val()
        }
    })
        .done((data) => {
            localStorage.setItem("token", data)
            cekLogin()
        }).catch((err) => {
            console.log(err);
            $("#error_login").html("")
            $("#error_login").append(`

               <div class="ui error message mini">
                <p>${err.responseJSON.err}</p>
                </div>
            `
            )

        })
}
function content() {
    $("#form-login-register").html("")
    $("#nav-bar").append(
        `<div class="ui blue inverted  menu">
            <a class="active item" onclick="task()">
                All Task
            </a>
            <a class="item" onclick="showPriority()">
                Priority Task
            </a>
            <a class="item" onclick="showCreatedModal()">
                 Add Task
            </a>
            <div class="right menu">
                <div class="item">
                    <div class="ui icon input" >
                        <input type="text" placeholder="Search...">
                        <i class="search link icon"  id="searchTask" ></i>
                    </div>
                </div>
                <a class="ui item" onClick="logout()">
                    Logout
                </a>
            </div>
        </div>`
    )
}
function logout() {
    localStorage.removeItem("token")
    $("#nav-bar").empty();
    $("#task").empty();
    formLogin()
}
function formLogin() {
    $("#form-login-register").append(
        ` 
         <div class="ui grid centered" style="margin-top: 100px">
        
                <div class="ui six wide column">
                <div id="error_register"></div>
                <div id="error_login"></div>
                    <div id="tabLogin" class="ui top attached tabular menu">
                        <a class="item active" data-tab="first">Login</a>
                        <a class="item" data-tab="second">Register</a>
                    </div>
                    <div class="ui bottom attached tab segment active" data-tab="first">
                        <div class="ui container">
                            <div class="ui form " id="login">
                                <div class="field">
                                    <label>email</label>
                                    <input type="text" name="email" placeholder="email" id="emailLogin">
                                </div>
                                <div class="field">
                                    <label>Password</label>
                                    <input type="password" name="password" placeholder="password" id="passwordLogin">
                                </div>
                                <button class="ui button" type="submit" onclick="login()">Login</button>
                                <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
                                </fb:login-button>
                            </div>
                        </div>
                    </div>
                   
                    <div class="ui bottom attached tab segment" data-tab="second">
                   
                        <div class="ui container">
                            <div class="ui form" id="register">

                                <div class="field">
                                    <label>name</label>
                                    <input type="text" name="name" placeholder="name" id="name">
                                </div>
                                <div class="field">
                                    <label>email</label>
                                    <input type="text" name="email" placeholder="email" id="email">
                                </div>
                                <div class="field">
                                    <label>password</label>
                                    <input type="password" name="password" placeholder="password" id="password">
                                </div>
                                <button class="ui button" type="submit" onclick="register()">Submit</button>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        `
    )
}

function task() {
    $("#task").html("")
    let token = localStorage.getItem("token")
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/tasks",
        headers: {
            token: token
        }
    })
        .done((data) => {
            $.each(data.tasks, function (index, value) {
                $("#task").append(`
                <!-- uicard -->
                <div class="card">
                    <div class="content">
                    <i class="right floated trash icon" onclick="deleteTask('${value._id}')"></i>
                        <div class="header">
                            ${value.name}
                        </div>
                        <div class="meta">
                            Due Date : ${value.dueDate}
                        </div>
                        <div class="description">
                        ${value.description}
                        </div>
                    </div>
                    <div class="extra content">
                        <div class="ui two buttons" id="${index}">
                         
                        </div>
                    </div>
                    <div class="extra content">
                        <span class="left floated like">
                        <i class="share square icon" onclick="showDetailModal('${value._id}','${value.name}','${value.description}')"></i>
                        Detail
                        </span>
                        <span class="right floated star">
                        <i class="star icon" onclick="addPriority('${value._id}')"  ></i>
                        Priority
                        </span>
                    </div>
                </div>
                <!-- endcard -->
                `)
                if (!value.status) {
                    $(`#${index}`).html("")
                    $(`#${index}`).append(
                        `
                        <div class="ui basic green button" id="completed_task" onclick="completedTask('${value._id}')">Completed</div>
                        <div class="ui basic red button" onclick="showUpdatedModal('${value._id}','${value.name}','${value.description}')">Update</div>
                        `
                    )
                }
                else {
                    $(`#${index}`).html("")
                    $(`#${index}`).append(
                        `
                        <div class="ui basic green button" id="completed_task" onclick="completedTask('${value._id}')"><strike>Completed</strike></div>
                        <div class="ui basic red button" onclick="showUpdatedModal('${value._id}','${value.name}','${value.description}')">Update</div>
                        `
                    )
                }
            })
        })
        .fail((err) => {
            console.log(err);
        })
}
function showCreatedModal() {
    $("#taskCreated").modal("show")
}
function createdTask() {
    let token = localStorage.getItem("token")
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/tasks/add",
        data: {
            task_name: $("#task_name").val(),
            description: $("#task_description").val(),
            due_date: $("#due_date").val()
        },
        headers: {
            token: token
        }
    })
        .done((data) => {
            $("#taskCreated").modal("hide")
            $("#task").html("")
            task()
        })
        .fail((err) => {
            console.log(err);
        })

}
function showUpdatedModal(id, name, description) {
    $("#update_task_name").val(`${name}`)
    $("#update_task_description").val(`${description}`)
    $("#image_id").val(`${id}`)
    $("#updated_task").modal("show")

}
function updatedTask() {
    let token = localStorage.getItem("token")
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/tasks/update",
        data: {
            id: $("#image_id").val(),
            task_name: $("#update_task_name").val(),
            description: $("#update_task_description").val(),
            due_date: $("#due_date").val()

        },
        headers: {
            token: token
        }
    })
        .done((data) => {
            $("#updated_task").modal("hide")
            $("#task").html("")
            task()
        })
        .fail((err) => {
            console.log(err);
        })

}
function completedTask(id) {
    let token = localStorage.getItem("token")
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/tasks/status",
        headers: {
            token: token
        },
        data: {
            id: id
        }
    })
        .then((data) => {
            $("#task").html("")
            task()

        }).catch((err) => {

        });
}
function showDetailModal(id, name, description) {
    $("#titleDetail").html("")
    $("#descriptionDetail").html("")
    $("#titleDetail").append(`
    <h3>${name}</h3>
    `)
    $("#descriptionDetail").append(`
    <p>${description}</p>
    `)
    $("#detailed_task").modal("show")
}

function deleteTask(id) {
    console.log(id);
    let token = localStorage.getItem("token")
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/tasks",
        headers: {
            token: token
        },
        data: {
            id: id
        }
    })
        .then((data) => {
            console.log(data);
            $("#task").html("")
            task()

        })
        .catch((err) => {
            console.log(data);
        })

}

function addPriority(id) {
    let token = localStorage.getItem("token")
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/tasks/priority",
        headers: {
            token: token
        },
        data: {
            id: id
        }
    })
        .then((data) => {
            $("#task").html("")
            task()

        }).catch((err) => {

        });
}
function showPriority() {
    let token = localStorage.getItem("token")
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/tasks/priority",
        headers: {
            token: token
        }
    })
        .done((data) => {
            console.log(data);

            $("#task").html("")
            $.each(data.tasks, function (index, value) {
                $("#task").append(`
                <!-- uicard -->
                <div class="card">
                    <div class="content">
                    <i class="right floated trash icon" onclick="deleteTask('${value._id}')"></i>
                        <div class="header" id="dataNma">
                            ${value.name}
                        </div>
                        <div class="meta">
                            Due Date : ${value.dueDate}
                        </div>
                        <div class="description">
                        ${value.description}
                        </div>
                    </div>
                    <div class="extra content">
                        <div class="ui two buttons" id="${index}">
                         
                        </div>
                    </div>
                    <div class="extra content">
                        <span class="left floated like">
                        <i class="share square icon" onclick="showDetailModal('${value._id}','${value.name}','${value.description}')"></i>
                        Detail
                        </span>
                        <span class="right floated star">
                        <i class="star icon" onclick="addPriority('${value._id}')"  ></i>
                        Priority
                        </span>
                    </div>
                </div>
                <!-- endcard -->
                `)
                if (!value.status) {
                    $(`#${index}`).html("")
                    $(`#${index}`).append(
                        `
                        <div class="ui basic green button" id="completed_task" onclick="completedTask('${value._id}')">Completed</div>
                        <div class="ui basic red button" onclick="showUpdatedModal('${value._id}','${value.name}','${value.description}')">Update</div>
                        `
                    )
                }
                else {
                    $(`#${index}`).html("")
                    $(`#${index}`).append(
                        `
                        <div class="ui basic green button" id="completed_task" onclick="completedTask('${value._id}')"><strike>Completed</strike></div>
                        <div class="ui basic red button" onclick="showUpdatedModal('${value._id}','${value.name}','${value.description}')">Update</div>
                        `
                    )
                }
            })
        })
        .fail((err) => {
            console.log(err);
        })
}
