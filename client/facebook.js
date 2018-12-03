window.fbAsyncInit = function() {
    FB.init({
      appId      : '119945625619467',
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

FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}
function statusChangeCallback( response ){
    console.log( response )
   let access_token = response.authResponse.accessToken
   $.ajax({
       method : 'POST',
       url : 'http://localhost:3000/users/login-facebook',
       data : { access_token }  
   })
   .done( response => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user_id', response.user_id)
        $('#login-modal').modal('hide')
        loginToggle()
   })
   .fail( error => {
       console.log('error login facebook :', error.data)
   })
}