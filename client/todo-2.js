$(document).on('click', '.show-task', function(e){
    e.preventDefault()
    let query = $(this).attr('href')
    axios({
        method: 'get',
        url: `http://localhost:3000/tasks/${query}`,
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    })
        .then(response=>{
            // console.log(response.data)
            let task = response.data
            $('#showTask').append(`
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Show Task</h5>
                        </div>
                        <div class="modal-body">
                            <form action="#" id="task-edit">
                                <input type="text" class="form-control" id="name" value="${task.name}" placeholder="name">&nbsp;
                                <input type="text" class="form-control" id="description" value="${task.description}" placeholder="descriptions">&nbsp;
                                <div class="form-group">
                                    <label for="due_date">Due date:</label>
                                    <input type="date" class="form-control" name="due_date" value="${getFullDate(task.due_date)}" id="due_date" placeholder="due_date">
                                </div>
                                <div class="form-group">
                                    <label for="due_date">Status</label>
                                    <select class="form-control" id="status" value="${getProgress(task.status)}">
                                        <option value=true>done</option>
                                        <option value=false>not done</option>
                                    </select>
                                </div>
                                
                                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a class="btn btn-danger" href="${task._id}" id="deleteTask">Delete</a>
                                <input class="btn btn-primary" type="submit" id="edit-button" value="Edit">
                            </form>
                        </div>
                
                    </div>task-edit
                    task-edit
                </div>
            `)
            
        })
        .catch(err=>{
            console.log(err)
        })
})

$('#edit-button').on('click', function(e){
    // e.preventDefault()
    alert('edit')
    let id = $('#deleteTask').attr('href')
    axios({
        method: 'put',
        url: `http://localhost:3000/tasks/${id}`,
        data: {
            name: $('#name').val(),
            description: $('#description').val(),
            due_date: $('#due_date').val(),
            status: $('#status').val()
        }
    })
        .then(response=>{
            console.log(response)
        })
        .catch(err=>{
            console.log(err)
        })
})

function getFullDate(date){
    date = new Date(date)
    let year = date.getFullYear()
    let month = date.getMonth()
    let dt = date.getDate()

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return `${year}-${month}-${dt}`
}

function getProgress(input){
    if(input=== true){
        return 'done'
    } else {
        return 'not done'
    }
}

