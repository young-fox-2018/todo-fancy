if(!localStorage.getItem('token')){
  window.location = '/login.html'
} else {
  var token = localStorage.getItem('token')
  var host = "http://localhost:3000/"
  var doneTask = []
  var warningTask = []
  var saveTask = []
  var dangerTask = []
  var allTask = []
  var groups = []
  var currentGroup = ''
  $("#chooseGroup").hide()
  $("#btnplaceholder").hide()
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
      showMyTask()
      resetAllForm()
    })
    .fail(err => {
      console.log(err)
      resetAllForm()
    })
}

function createTaskToGroup(task) {
    $.ajax({
      method: 'POST',
      url: host + 'groups/' + currentGroup,
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
      showMyGroupTask(currentGroup)
      resetAllForm()
    })
    .fail(err => {
      console.log(err)
      resetAllForm()
    })
}

function createGroup(name) {
    $.ajax({
      method: 'POST',
      url: host + 'groups',
      data: {
        name : name
      },
      headers: {
        token : token
      }
    })
    .done(response => {
      console.log(response)
      showMyTask()
      resetAllForm()
      getMyGroupList()
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
  $("#groupName").val('')
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
      return 'info'
    } else if (Number(deadlineMonth) > currentMonth) {
      return 'info'
    } else if (Number(deadlineDay) - today <= 2) {
      return 'danger'
    } else if (Number(deadlineDay) - today <= 6) {
      return 'warning'
    } else {
      return 'info'
    }
  } else {
    return 'success'
  }

}

function showMyTask() {
  $("#addTaskGroup").hide()
  getTask(`${host}tasks`)
  .then(data => {
    data.reverse()
    allTask = data
    saveTask = []
    warningTask = []
    dangerTask = []
    doneTask = []
    $("#taskContainer").text(`Task List`)
    $("#toDoList").empty()
    $.each(data, (index, value) => {
      let condition = (dayCounter(value.deadline, value.status))
      if(condition == 'info') {
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
                <button type="button" id="${value._id}" class="updateTask mr-3 btn btn-light" data-toggle="modal" data-target="#exampleModalCenter">
                  Update
                </button>
                <a href="#" onclick="return confirm('Are you sure you want to delete this item?');" class="card-link delete btn btn-light" id="${value._id}">Delete</a>
              </div>
            </div>`)
    })
  })
  .catch(err => {
    console.log(err)
  })
}

function deleteTask(id) {
  $.ajax({
    url : `${host}tasks/${id}`,
    method : "DELETE",
    headers : {
      'token' : token
    }
  })
  .done((response) => {
    console.log(response);
    showMyTask()
  })
  .fail(err => {
    console.log(err);
  })
}

function updateTask(task) {
  $.ajax({
    url : `${host}tasks/` + $("#taskId").val(),
    method : "PUT",
    headers : {
      token : localStorage.getItem("token")
    },
    data : {
      name : $("#nameUpdate").val(),
      description : $("#descUpdate").val(),
      status : $("#statusUpdate").val(),
      deadline : $("#dateUpdate").val()
    }
  })
    .done((response) => {
      console.log(response);
      //location.reload(true);
      showMyTask()
    })
    .fail(err => {
      console.log(err);
    })
}

function getMyGroupList() {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: `${host}users/groups`,
      headers: {
        token : token
      }
    })
    .done(groupList => {
      groups = groupList
      if(groups.length > 0){
        $("#chooseGroup").show()
      }
      $("#groupPick").empty()
      $.each(groups, function(index, value) {
        $("#groupPick").append(`<option value="${value._id}">${value.name}</option>`)
      })
      console.log(groups)
    })
    .fail(err => {
      console.log(err)
    })
  })
}

function showMyGroupTask(id) {
  getTask(`${host}groups/${id}`)
    .then(tasks => {
      console.log(tasks)
      tasks.reverse()
      allTask = tasks
      saveTask = []
      warningTask = []
      dangerTask = []
      doneTask = []
      $("#toDoList").empty()
      $.each(tasks, function(index, value) {
        let condition = (dayCounter(value.deadline, value.status))
        if(condition == 'info') {
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
                    <button type="button" id="${value._id}" class="updateTask mr-3 btn btn-light" data-toggle="modal" data-target="#exampleModalCenter">
                      Update
                    </button>
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
      getMyGroupList()
      $("#btnplaceholder").hide()
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
        condition = 'info'
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
  $("#toDoList")
    .on('click', '.delete', event => {
      const id = $(event.currentTarget).attr('id');
      deleteTask(id)
    })
  $("#toDoList")
    .on('click', '.updateTask', event => {
      const id = $(event.currentTarget).attr('id');
      let currentTask = allTask.filter(data => data._id === id)
      currentTask = currentTask[0]
      currentTask.deadline = currentTask.deadline.slice(0,10)
      $("#taskId").val(id)
      $("#nameUpdate").val(currentTask.name)
      $("#descUpdate").val(currentTask.description)
      $("#statusUpdate").val(currentTask.status)
      $("#dateUpdate").val(currentTask.deadline)
    })
  $("#clickUpdate").click((e) => {
      e.preventDefault();
      updateTask()
    })
  $("#createGroupButton").click((e) => {
    let name = $("#groupName").val()
    createGroup(name)
  })
  $("#chooseGroup").click((e) => {
    e.preventDefault()
    $("#taskContainer").text(`${$("#groupPick").text()} Task List`)
    $("#btnplaceholder").show()
    const groupId = ($("#groupPick").val())
    currentGroup = groupId

    console.log(currentGroup)
    showMyGroupTask(groupId)
  })
  $("#createTaskToGroup").click((e) => {
    // e.preventDefault()
    let task = {
      name : $("#nameTaskGroup").val(),
      description : $("#descTaskGroup").val(),
      status : $("#statusTaskGroup").val(),
      deadline : $("#dateTaskGroup").val()
    }
    createTaskToGroup(task)
  })
})
