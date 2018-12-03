let image = null
const loginToggle = () =>{
    if ( localStorage.getItem('token') ){
        $('#logut-button').show()
        $('#login-button').hide()
        $('#menu').show()
        $('#homepage-header').hide()
        Todo.read()
    }else{
        $('#login-button').show()
        $('#logut-button').hide()
        $('#homepage-header').show()
        $('#menu').hide()
    }
}
const logout = () => {
    console.log('logout')
    localStorage.clear()
    loginToggle()
}
const clear = () => {
    $('#name_register').val(''),
    $('#email_register').val(''),
    $('#password_register').val('')
    $('#email_login').val(''),
    $('#password_login').val('')
}

const register = () =>{
    //  let data = new FormData()
    //  data.append('picture', image)
    //  data.append('name', $('#name_register').val())
    //  data.append('email', $('#email_register').val())
    //  data.append('password', $('#password_register').val())
    
    // $.ajax({
    //     method : 'POST',
    //     url : 'http://localhost:3000/users/register',
    //     data : data,
    //     dataType : 'multipart/form-data',
    //     processData : false,
    //     contentType : false
    // })
    $.ajax({
        method : 'POST',
        url : 'http://localhost:3000/users/register',
        data : {
            name : $('#name_register').val(),
            email : $('#email_register').val(),
            password : $('#password_register').val()
        }
    })
    .done( response => {
        clear()
        $('#success_register').show()
    })
    .fail( ({ responseJSON}) => {
        console.log( responseJSON )
        responseJSON.path.forEach(err => {
            $(`#${err}_register`).addClass('is-invalid')
        })
    })

}

const login = () => {
    let email = $('#email_login').val()
    let password = $('#password_login').val()
    $.ajax({
        method : 'POST',
        url : 'http://localhost:3000/users/login',
        data :{ email, password}
    })
    .done( response =>{
        localStorage.setItem('token', response.token)
        localStorage.setItem('user_id', response.user_id)
        $('#login-modal').modal('hide')
        clear()
        loginToggle()
    })
    .fail( ({responseJSON}) => {
        $(`#${responseJSON.path}_login`).addClass('is-invalid')
    })
}