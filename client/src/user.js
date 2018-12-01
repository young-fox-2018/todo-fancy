if(!localStorage.getItem('token')){
  window.location = '/login.html'
} else {
  var token = localStorage.getItem('token')
  var host = "http://localhost:3000/"
  var doneTask = []
  var warningTask = []
  var saveTask = []
  var dangerTask = []
}

function onLoad() {
  gapi.load('auth2', function () {
    gapi.auth2.init();
  })
}

$(function(){
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;
    $('#date').attr('min', maxDate);
    $('#updateDate').attr('min', maxDate);
})

function createTask(task) {
    $.ajax({
      method: 'POST',
      url: host + 'tasks',
      data: {
        name : task.name,
        description : task.description,
        deadline : task.deadline,
        status : task.status
      },
      headers: {
        token : token
      }
    })
    .done(response => {
      console.log(response)
      resetAllForm()
    })
    .fail(err => {
      console.log(err)
      resetAllForm()
    })
}

function resetAllForm() {
  $("#name").val('')
  $("#desc").val('')
  $("#status").val('')
  $("#date").val('')
  $("#nameUpdate").val('')
  $("#descUpdate").val('')
  $("#statusUpdate").val('')
  $("#dateUpdate").val('')
}

function getTask (url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url : url,
      method : "GET",
      headers : {
        token : localStorage.getItem("token")
      }
    })
    .done((response) => {
      resolve(response)
    })
    .fail((err) => {
      reject(err)
    })
  })
}

function dayCounter(deadline, status) {
  let deadlineDay = deadline.slice(8,10)
  let deadlineMonth = deadline.slice(5,7)
  let deadlineYear = deadline.slice(0,4)
  let today = new Date().getDate()
  let currentMonth =  new Date().getMonth() + 1
  let currentYear = new Date().getFullYear()

  if(deadlineDay[0] == 0) {
    deadlineDay = deadlineDay[1]
  }
  if(deadlineMonth[0] == 0) {
    deadlineMonth = deadlineMonth[1]
  }
  if(status == 'working') {
    if(Number(deadlineYear) > currentYear) {
      return 'primary'
    } else if (Number(deadlineMonth) > currentMonth) {
      return 'primary'
    } else if (Number(deadlineDay) - today <= 2) {
      return 'danger'
    } else if (Number(deadlineDay) - today <= 6) {
      return 'warning'
    } else {
      return 'primary'
    }
  } else {
    return 'success'
  }

}

function showMyTask() {
  getTask(`${host}tasks`)
  .then(data => {
    $("#toDoList").empty()
    $.each(data, (index, value) => {
      let condition = (dayCounter(value.deadline, value.status))
      if(condition == 'primary') {
        saveTask.push(value)
      } else if (condition == 'warning') {
        warningTask.push(value)
      } else if (condition == 'danger') {
        dangerTask.push(value)
      } else if (condition == 'success') {
        doneTask.push(value)
      }
      $("#toDoList")
      .append(`<div class="card content bg-${condition} mb-2 text-white">
              <div class="card-header"><h5 class="card-title">${value.name}</h5></div>
              <div class="card-body">
                <p class="card-subtitle mb-2">Deadline: ${value.deadline.slice(0,10)}</h6>
                <p class="desc card-text">Description : ${value.description}</p>
                <button type="button" id="${value.id}" class="updateTask mr-3 btn btn-light" data-toggle="modal" data-target="#exampleModalCenter">
                  Update
                </button>
                <a href="#" onclick="return confirm('Are you sure you want to delete this item?');" class="card-link delete btn btn-light" id="${value.id}">Delete</a>
              </div>
            </div>`)
    })
  })
  .catch(err => {
    console.log(err)
  })
}



$(document).ready(function() {
  function initUserPage() {
      $("#displaySuccess").hide();
      $("#displayError").hide();
      $(".signOut").show();
      $("#userContent").show();
      showMyTask()
  }
  onLoad()
  initUserPage()
  $(".signOut").click((e) => {
    var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    localStorage.removeItem('token')
    window.location = '/index.html'
  })
  $("#addTask").click((e) => {
    e.preventDefault()
    const task = {
      name : $("#name").val(),
      description : $("#desc").val(),
      status : $("#status").val(),
      deadline : $("#date").val()
    }
    createTask(task)
  })
  $("#filterButton").click((e) => {
    const statusFilter = $("#statusFilter").val()
    if(statusFilter == 'all') {
      showMyTask()
    } else {
      $("#toDoList").empty()
      let data = []
      let condition = ''
      if(statusFilter == 'done') {
        data = doneTask
        condition = 'success'
      } else if (statusFilter == 'save') {
        data = saveTask
        condition = 'primary'
      } else if (statusFilter == 'danger') {
        data = dangerTask
        condition = 'danger'
      } else if (statusFilter == 'warning') {
        data = warningTask
        condition = 'warning'
      }
      $.each(data, (index, value) => {
        $("#toDoList")
        .append(`<div class="card content bg-${condition} mb-2 text-white">
                <div class="card-header"><h5 class="card-title">${value.name}</h5></div>
                <div class="card-body">
                  <p class="card-subtitle mb-2">Deadline: ${value.deadline.slice(0,10)}</h6>
                  <p class="desc card-text">Description : ${value.description}</p>
                  <button type="button" id="${value.id}" class="updateTask mr-3 btn btn-light" data-toggle="modal" data-target="#exampleModalCenter">
                    Update
                  </button>
                  <a href="#" onclick="return confirm('Are you sure you want to delete this item?');" class="card-link delete btn btn-light" id="${value.id}">Delete</a>
                </div>
              </div>`)
      })
    }
  })

})
