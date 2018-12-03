$(document).ready(function() {
    console.log("script login run")

    $("#displayError").hide()

    $('#clickLogin').click(function(prop) {
        prop.preventDefault()
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
                console.log(response.message)
                window.location = '/index.html'
            })
            .fail(function(err) {
                $("#messageError").text("email / password invalid")
                $("#displayError").show()
                $("#valueEmail").val('')
                $("#valuePassword").val('')
            })
    })
})