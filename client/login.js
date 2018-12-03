$(document).ready(function() {
    console.log("script login run")
    showTask()
    isLogin()
    $("#displayError").hide()

    $("#buttonLogin").click(function(e) {
        e.preventDefault()
        $.ajax({
            url:'http://localhost:3000/users/login',
            method: 'POST',
            data: {
                email: $("#valueEmail").val(),
                password: $("#valuePassword").val()
            }
        })
        .done(function(response) {
                localStorage.setItem('token', response.token)
                $("#valueEmail").val('')
                $("#valuePassword").val('')
                console.log(response.token)
                isLogin()
            })
            .fail(function(err) {
                $("#messageError").text("email / password invalid")
                $("#displayError").show()
                $("#valueEmail").val('')
                $("#valuePassword").val('')
            })
    })
    
        
})
  

function isLogin() {
    if (localStorage.getItem("token")) {
        $("#loginForm").hide()
        $("#userGreetings").show()
        $("#detailBox").show()
        $("#addTask").show()
    } else {
        $("#loginForm").show()
        $("#detaiBox").hide()
        $("#userGreetings").hide()   
        $("#addTask").hide()
    }
}
function showTask() {
    $.ajax({
    url:'http://localhost:3000/tasks',
    method: 'GET',
    headers: {
        token: localStorage.getItem("token")
    }
    })
    .done(function(response_task) {
        $('#uncompleteList').html('')
        $.each(response_task, function(index) {
            $("#uncompleteList").append(`
            <div class="card">
            <div class="card-body">
            <p class="card-text">${response_task[index].description}</p>
            <a href="#" class="btn btn-primary">Button</a>
            </div>
            </div>
            `)
        })
    })
    .fail(function(err) {

    })
    
    $("#buttonAddTask").click(function(e) {
        e.preventDefault()
        $.ajax({
            url:'http://localhost:3000/tasks',
            method: 'POST',
            data: {
                description: $("#valueDescription").val()
            },
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .done(function() {
            console.log("berhasil post")
            $("#valueDescription").val('')
            showTask()
        })
        .fail(function() {
            console.log("gagal post")
        })
    })
}
