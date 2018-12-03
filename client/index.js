function masuk(){
	event.preventDefault()
	console.log("masuk")
	$.ajax({
	  method: "POST",
	  url: "http://localhost:3000/users/login",
	  data:{ identity: $("#usernameoremail").val(), password: $("#password").val()}
	})
	.done( token => {
	  localStorage.setItem("token",token)
	  window.location='list.html'
	})
	.fail( error  => {
		console.log(error)
	  $("#login-alert").append(`
	  <div class="alert alert-danger alert-dismissible fade show" role="alert">
	  <strong>Oooops...!</strong> ${error.responseJSON.error}
	  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	  </button>
	</div>
	  `)
	})
}

function daftar(){
	event.preventDefault()
	console.log("daftar")
	console.log(`signup kepanggil`)
	   $.ajax({
		  method: "POST",
		  url: "http://localhost:3000/users",
		  data:{ username: $("#usernameSignUp").val(), email: $("#emailSignUp").val(), password: $("#passwordSignUp").val()}
	   })
	   .done( token => {
		  $('#signupbox').hide(); 
		  $('#loginbox').show()
	   })
	   .fail( error  => {
		   console.log(error)
		  $("#signupalert").text(error.responseJSON.error)
		  $("#signupalert").fadeIn()
		})
}
