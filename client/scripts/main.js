

checkUserLogin();

const login = document.getElementById('loginform');
const register = document.getElementById('registerform');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == login || event.target == register) {
        login.style.display = "none";
        register.style.display = "none";
    }
}

//NOTE: AJAX
$('.register').submit(function(e) {
    e.preventDefault();
    document.getElementById('registerform').style.display = "none";
    
    //NOTE: CASE SUCCESS, STILL COULDN'T HANDLE IF USER INPUT DIFFERENT PASSWORD
    const userData = {
        email: e.currentTarget[0].value,
        password: e.currentTarget[1].value
    };
    $.ajax({
        method: 'POST',
        data: userData,
        url: 'http://localhost:3000/users/register'
    })
    .done(function(user) {        
        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', user.id);        
        checkUserLogin();
    })
    .fail(function(err) {
       console.log(`Failed register as new user`);
       console.log(err);
    });
});

$('.login').submit(function(e) {
    e.preventDefault();
    document.getElementById('loginform').style.display = "none";

    const userData = {
        email: e.currentTarget[0].value,
        password: e.currentTarget[1].value
    };

    $.ajax({
        method: 'POST',
        data: userData,
        url: 'http://localhost:3000/users/login'
    })
    .done(function(user) {              
        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', user.id);        
        checkUserLogin();
    })
    .fail(function(err) {
       console.log(`Failed login`);
       console.log(err);
    });
});

$('#addTodo').submit(function(e) {
    e.preventDefault();
    
    const title = e.currentTarget[0].value;
    const description = e.currentTarget[1].value;
    const due_date = e.currentTarget[2].value;
    
    $('#title').text('')
    $('#description').text('')
    $('#due_date').removeAttr('value');

    $.ajax({
        method: 'POST',
        data: {
            title, 
            description, 
            due_date, 
            user: localStorage.userId, 
            token: localStorage.token
        },
        url: 'http://localhost:3000/todos'
    })
    .done(function(todo) {
        checkUserLogin();
    })
    .fail(function(err) {
        console.log(`error create new todo in html`);
    });
});

$('#editTodo').submit(function(e) {
    e.preventDefault();

    const title = e.currentTarget[0].value;
    const description = e.currentTarget[1].value;
    const due_date = e.currentTarget[2].value;

    $.ajax({
        method: 'PUT',
        data: {
            title, 
            description, 
            due_date, 
            token: localStorage.token
        },
        url: `http://localhost:3000/todos/${this.id}`
    })
    .done(function(response) {
        $('#editTodo').hide();        
        getAllTodos()
    })
    .fail(function(err) {
        console.log(err);
    })
})

$('.card-columns').on('click', '.updateTodo', function(e) {    
    $('#editTodo').show();
    $('#addTodo').hide();

    const status = $(this)[0].previousElementSibling;
    const description = status.previousElementSibling;
    let due_date = description.previousElementSibling;
    const title = due_date.previousElementSibling.previousElementSibling;
    
    $('#editTodo').attr('id', title.parentElement.id);
    $('#title').val(title.textContent)
    $('#description').val(description.textContent)
});

$('.card-columns').on('click', '.completeTodo', function(e) {
    const idTodo = e.target.parentElement.id;
    // console.log(e, `completetodo======`);
    // console.log(idTodo, `id======`);

    $.ajax({
        method: 'PUT',
        data: {
            status: 'complete',             
            token: localStorage.token
        },
        url: `http://localhost:3000/todos/${idTodo}`
    })
    .done(function(response) {
        $('#editTodo').hide();        
        getAllTodos()
    })
    .fail(function(err) {
        console.log(err);
    })
});

$('.card-columns').on('click', '.deleteTodo', function(e) {
    var confirmDeleteTodo = confirm('Are you sure want to delete this todo?');
    if(confirmDeleteTodo) {
        const idTodo = $(this)[0].parentElement.id;
        $.ajax({
            method: 'DELETE',
            url: `http://localhost:3000/todos/${idTodo}`
        })
        .done(function(response) {
            getAllTodos();
        })
        .fail(function(err) {
            console.log(err);
        });
    }
});

function getAllTodos(){
    $.ajax({
        method: 'GET',
        data: {token: localStorage.token},
        url: 'http://localhost:3000/users/'
    })
    .done(function(userDetails) {
        $('.col-9').empty();
        userDetails.todos.forEach(todo => {
            if(todo.status === 'pending') {
                var bg = 'bg-warning';
                var btnComplete = '';
            } else {
                var bg = 'bg-success';
                var btnComplete = 'disabled';
            }
            $('.col-9').append(`
                <div class="card ${bg}" style="width: 18rem;">
                    <div class="card-body" id="${todo._id}">
                        <h5 class="card-title">${todo.title}</h5><hr>
                        <h6 class="card-subtitle mb-2">Due date: ${todo.due_date}</h6>
                        <p class="card-text">${todo.description}</p>
                        <p class="card-text">Status: ${todo.status}</p>
                        <a class="btn btn-sm btn-primary updateTodo">Update</a>
                        <a class="btn btn-sm btn-danger deleteTodo" onclick="deleteTodo('${todo._id}')">Delete</a>
                        <a class="btn btn-sm btn-success completeTodo" ${btnComplete}>Completed</a>
                    </div>
                </div> 
            `);
        });
    })
    .fail(function(err) {
        console.log(`error getting user details`);
        console.log(err);
    })
}

// NOTE: Custom functions
function checkUserLogin() {    
    if(localStorage.token){
        $('.guestPrivileged').hide();
        $('.userPrivileged').show();
        getAllTodos();
    } else {
        $('.guestPrivileged').show();
        $('.userPrivileged').hide();
    }
}

function logout() {
    var userLogout = confirm('Are you sure want to logout?');
    if(userLogout) {
        localStorage.clear();
        checkUserLogin();
    }
}