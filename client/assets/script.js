
function init(){
    $('#signin').hide()
    $('#warning').hide()
    $('#success').hide()

    $('#signup-form').submit(function(event){
        event.preventDefault()
        signup()
    })
    $('#loginfacebook').submit(function(event){
        event.preventDefault()
        loginfacebook()
    })
    $('#signin-form').submit(function(event){
        event.preventDefault()
        signin()
    })
    $('#signinAccount').click(function(event){
        event.preventDefault()
        $('#signup').hide()
        $('#signin').show()
    })
}

function signup(){
    let name = $('#registerName').val()
    let email = $('#registerEmail').val()
    let password = $('#registerPassword').val()
    // console.log([name,email,password])
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/user/signup',
        data: {
            name,email,password
        },
        dataType: 'json'
      })
      .done(result => {
        console.log(result)
        document.getElementById("success_sentences").innerHTML = `success sign up, please re-login to continue`
        $('#success').show()
      })
      .fail(err => {
          console.log(err)
          document.getElementById("warning_sentences").innerHTML = `${err.responseText}`
          $('#warning').show()
      })
}

function loginfacebook(accessToken){
    console.log("masuuk")
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/user/signinFacebook',
        data: {
            "token": accessToken
        },
        dataType: 'json'
      })
      .done(result => {
        console.log(result)
        localStorage.clear()
        localStorage.setItem('token',result.token);
        window.location = '../todoo.html'
      })
      .fail(err => {
          console.log(err)
          //   alert(err.responseJSON.msg)
          document.getElementById("warning_sentences").innerHTML = `${err.responseText}`
          $('#warning').show()
      })
}

function signin(){
    let email = $('#loginEmail').val()
    let password = $('#loginPassword').val()

    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/user/signinEmail',
        data: {
            email,password
        },
        dataType: 'json'
      })
      .done(result => {
        console.log(result)
        localStorage.clear()
        localStorage.setItem('token',result.token);
        window.location = '../todoo.html'
      })
      .fail(err => {
          console.log(err)
          document.getElementById("warning_sentences").innerHTML = `${err.responseText}`
          $('#warning').show()
      })
}

init()
