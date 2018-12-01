$( document ).ready(function() {
  console.log( "ready!" );

  $(".signUp").click((e) => {
    e.preventDefault();
    $("#loginPage").show();
    $("#loginForm").hide();
    $("#displayError").hide();
    $("#displaySuccess").hide();
    $("#registerForm").show(e);
  })

  $(".signIn").click((e) => {
    e.preventDefault();
    $("#loginPage").show();
    $("#loginForm").show(e);
    $("#registerForm").hide();
    $("#displayError").hide();
    $("#displaySuccess").hide();
  })

  $("#clickRegister").click((e) => {
    e.preventDefault();
    $.ajax({
      url : 'http://localhost:3000/users',
      method : 'POST',
      data : {
        username : $("#usernameRegister").val() ,
        email : $("#emailRegister").val(),
        password : $("#passwordRegister").val()
      }
    })
    .done(response => {
      $("#passwordRegister").val('')
      $("#emailRegister").val('')
      $("#usernameRegister").val('')
      $("#msg-success").text('User Successfully created. Please login');
      $("#displaySuccess").show();
      $("#displayError").hide();
    })
    .fail(err => {
      console.log(err.responseJSON)
      $("#passwordRegister").val('')
      $("#emailRegister").val('')
      $("#usernameRegister").val('')
      $("#msg").text('Registration failed, ' + err.responseJSON.err);
      $("#displayError").show();
      $("#displaySuccess").hide();
    })
  })

  $("#clickLogin").click((e) => {
    e.preventDefault();
    $.ajax({
      url : 'http://localhost:3000/users/login',
      method : 'POST',
      data : {
        email : $("#emailLogin").val(),
        password : $("#passwordLogin").val()
      }
    })
    .done(response => {
      localStorage.setItem('token', response.token);
      $("#emailLogin").val('')
      $("#passwordLogin").val('')
      console.log(response.msg)
      window.location = '/user.html'
    })
    .fail(err => {
      console.log(err)
      $("#msg").text('Email / password invalid');
      $("#displayError").show();
      $("#emailLogin").val('')
      $("#passwordLogin").val('')
    })
  })

});
