import { getTodos } from './todo.js'
import url from './url.js'

function gOnSignIn(googleUser) {
  $.post({
    url: url + '/users/gsignin',
    data: {
      id_token: googleUser.getAuthResponse().id_token
    }
  })
    .done(data => {
      localStorage.setItem('token', data.response)
      localStorage.setItem('idProvider', 'google')
      toggleLogin()
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log(errorThrown)
    })
}

function gSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function toggleSignup(option) {
  if (option === 'show') {
    $('#login').hide()
    $('#signup').show()
  } else {
    $('#login').show()
    $('#signup').hide()
  }
}

export function toggleLogin() {
  if (localStorage.getItem('token')) {
    $('#logoutButton').show()
    $('#login').hide()
    $('#signup').hide()
    $('#app').show({ done: getTodos })
  } else {
    $('#logoutButton').hide()
    $('#login').show()
    $('#app').hide()
  }
}

export default () => {
  toggleLogin()

  $('#signupButton').click(event => {
    toggleSignup('show')
  })

  $('#signupForm').submit(event => {
    event.preventDefault()
    $.post(url + '/users/signup', {
      username: $('#regUsername').val(),
      email: $('#regEmail').val(),
      password: $('#regPassword').val(),
    })
      .done(data => {
        toggleSignup('hide')
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.log(errorThrown)
      })

  })

  $('#loginForm').submit(event => {
    event.preventDefault()
    $.post(url + '/users/signin', {
      identity: $('#inputIdentity').val(),
      password: $('#inputPassword').val(),
    })
      .done(data => {
        localStorage.setItem('token', data.response)
        localStorage.setItem('idProvider', 'client')
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.log(errorThrown)
      })
      .always(() => {
        toggleLogin()
      })

  })

  $('#logoutButton').click(event => {
    if (localStorage.getItem('idProvider') === 'google') gSignOut()
    localStorage.clear()
    $('#app').empty()
    toggleLogin()
  })

  window.gOnSignIn = gOnSignIn

}