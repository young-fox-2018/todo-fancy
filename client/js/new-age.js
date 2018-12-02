(function($) {
  "use strict"; // Start of use strict
$(document).ready(function() {
  console.log('ready go!')
  checkLogin()
  function checkLogin() {
      if (localStorage.getItem('token')) {
          $("#loginform").hide()
          $("#descript").show()
          $("#features").show()
          $("#download").show()
          $("#dolist").show()
    } else {
      $("#descript").hide()
      $("#download").hide()
      $("#features").hide()
      $("#dolist").hide()
    }
  }
})

    $('#register').submit(function(data){
        data.preventDefault()
        let username = $(".username").val()
        let email = $('.email').val()
        let password = $('.password').val()
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/users/register",
            data: {
                name: username,
                email: email,
                password: password
            }
        })
        .done(function(response){
            console.log(response)
        })
        .fail(function () {
          $("#errorCreateAccount").fadeIn().delay(5000).fadeOut()
        })
    })
    >
        $("#login").submit(function(e){
            e.preventDefault()
            let usernamelog = $(".usernamelogin").val()
            let passwordlog = $(".passwordlogin").val()
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/users/login",
                data: {
                        email: usernamelog,
                        password: passwordlog
                }
            })
            .done(function(response){
              console.log('masuksiniiii',response)
                localStorage.setItem('token', response.token)
                // window.location = '/index.html'
            })
            .fail(function (err) {
              console.log("emank iya masuk sini ?",err)
              $("#errorLogin").fadeIn().delay(5000).fadeOut()
            })
        })
        $("#errorLogin").hide()

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  var input = $('.validate-input .input100');

  $('.validate-form').on('submit',function(){
      var check = true;
      for(var i=0; i<input.length; i++) {
          if(validate(input[i]) == false){
              showValidate(input[i]);
              check=false;
          }
      }
      return check;
  });


  $('.validate-form .input100').each(function(){
      $(this).focus(function(){
         hideValidate(this);
      });
  });

  function validate (input) {
      if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
          if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
              return false;
          }
      }
      else {
          if($(input).val().trim() == ''){
              return false;
          }
      }
  }

  function showValidate(input) {
      var thisAlert = $(input).parent();
      $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
      var thisAlert = $(input).parent();
      $(thisAlert).removeClass('alert-validate');
  }
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict
