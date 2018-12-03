$(document).ready(function(){
    if(isLogin()=== false){
        $('#home').hide()
        $('#login').show()
        $('#page-top').addClass('bg-dark')
    } else {
        $('#home').show()
        $('#login').hide()
        $('#page-top').removeClass('bg-dark')
        getTodos()
        // Cookie.set('google_token', localStorage.getItem('accessTokens'))
    }
})

$('#task-form').on('submit',function(event){
    event.preventDefault()
    axios({
        method: 'POST',
        url: 'http://localhost:3000/tasks',
        headers: {
            accessToken: localStorage.getItem('accessToken')
        },
        data: {
            name: $('#name').val(),
            description: $('#description').val(),
            due_date: $('#due_date').val()
        }
    })
        .then(response=>{
            getTodos()
            $('#formTodo').modal('hide')

        })
        .catch(err=>{
            console.log(err)
        })
})

function getTodos(){
    // console.log(localStorage.getItem('accessToken'))
    axios({
        method: 'GET',
        url: 'http://localhost:3000/tasks',
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    })
        .then(response=>{
            let todos = response.data
            // console.log(response)
            todos.map(todo=>{
                $('#task-lists').append(`
                <div class="col-md-4">
                    <div class="card">
                        <h5 class="card-header">Featured</h5>
                        <div class="card-body">
                        <h5 class="card-title">${todo.name}</h5>
                        <p class="card-text">${todo.description}</p>
                        <a href="#" class="btn btn-primary" onclick="show(${todo})">show</a>
                        </div>
                    </div>
                </div>
                `)
            })
        })
        .catch(err=>{
            console.log(err)
        })
}
function isLogin(){
    if(localStorage.getItem('accessToken')){
        return true
    } else {
        return false
    }
}

$('#login-form').on('submit', function(e){
    e.preventDefault()
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val()
        }
    })
        .done(response=>{
            localStorage.setItem('accessToken', response.accessToken)
            // location.reload()
        })
        .fail(error=>{
            console.log(error)
        })
})

$('#logoutButton').on('click', function(e){
    e.preventDefault()
    localStorage.removeItem('accessToken')
    location.reload()
})

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
   
    axios({
        method: 'POST',
        url: 'http://localhost:3000/gsignin',
        data:{
            gtoken :id_token
        }
    })
        .then(response=>{
            localStorage.setItem('accessToken', response.accessToken)
            location.reload()
        })
        .catch(err=>{
            console.log(err)
        })
}


window.fbAsyncInit = function() {
FB.init({
    appId      : '1987450261290720',
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

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    
});

function statusChangeCallback(response){
    // console.log(response.authResponse)
    axios({
        method: 'POST',
        url: 'http://localhost:3000/fb-login',
        data: {
            accessToken: response.authResponse.accessToken
        }
    })
        .then(response=>{
            // console.log(response)
            localStorage.setItem('accessToken', response.data.accessToken)
            location.reload()
        })
        .catch(err=>{
            console.log(err)
        })
}

function getTodos(){
    // console.log(localStorage.getItem('accessToken'))
    axios({
        method: 'GET',
        url: 'http://localhost:3000/tasks',
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    })
        .then(response=>{
            let todos = response.data
            todos.forEach(todo=>{
                $('#task-lists').append(`
                <div class="col-md-4">
                    <div class="card">
                        <h5 class="card-header">Featured</h5>
                        <div class="card-body">
                        <h5 class="card-title">${todo.name}</h5>
                        <p class="card-text">${todo.description}</p>
                        <a href="${todo._id}" class="btn btn-primary show-task" data-toggle="modal" data-target="#showTask">Show</a>
                        </div>
                    </div>
                </div>
                `)
            })
        })
        .catch(err=>{
            console.log(err)
        })
}





           