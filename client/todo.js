const Todo = {
    display :( user ) => {
        $('#list-todo').empty()
        
        user.todoes.forEach( todo => {
            let template = `
                <div class="col-sm-6 mb-2">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-baseline">
                            <p class="font-weight-bold"> ${user.name} </p>
                            <div>
                                <img src="${user.picture}" class="rounded-circle" style="width:50px">
                            </div>
                           
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${todo.name}</h5>
                            <p class="card-text">${todo.description}</p>
                            <p>${new Date(todo.due_status).toDateString() }</p>
                            <p>${todo.status}</p>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <button ${todo.status === true ? 'disabled' : ''} class="btn btn-info"
                                    data-toggle="modal" 
                                    data-target="#modalUpdate"

                                    data-id="${todo._id}"
                                    data-name="${todo.name}"
                                    data-description="${todo.description}"
                                    data-due_status ="${todo.due_status}">Update

                                </button>
                                <button onClick="Todo.done('${todo._id}')" class="btn btn-danger">Done</button>
                                <button ${todo.status === true ? 'disabled' : ''} data-toggle="modal" data-target="#modalDelete" data-id="${todo._id}" class="btn btn-danger">Delete</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            `
            $('#list-todo').append(template)
        })
    },
    clear : () => {
        $('#name').val('')
        $('#description').val('')  
        $('#due_status').val('')
        $('#name_update').val()
        $('#description_update').val()
        $('#due_status_update').val()
    },
    create : function() {
        console.log('create')
        let data = {
            name : $('#name').val(),
            description : $('#description').val(),
            due_status : $('#due_status').val()
        }
        if ( id_group ){
            data.id_group = id_group   
        }
        $.ajax({
            method : 'POST',
            url : 'http://localhost:3000/todo',
            headers : { jtoken : localStorage.getItem('token')},
            data : data
        })
        .done( newTodo => {
            console.log('berhasil')
            this.clear()
            $('#add-todo').modal('hide')
            if( id_group ){
                Group.findById(id_group)
            }else{
                this.read()
            }
        })
        .fail( ({ responseJSON}) => {
           responseJSON.path.forEach((path, index) => {
               $(`#${path}`).addClass('is-invalid');
           })
        })
    },
    read : function(){
        $.ajax({
            method : 'GET',
            url : 'http://localhost:3000/todo',
            headers : { jtoken : localStorage.getItem('token')}
        })
        .done( user => {
            this.display( user )
        })
        .fail( error => {
            console.log('error read todo :', error.message)
        })
    },
    update : function(){
        let id = $('#id_update').val()
        let data = {
            name : $('#name_update').val(),
            description : $('#description_update').val(),
            due_status : $('#due_status_update').val(),
        }
        $.ajax({
            method : 'PUT',
            url : `http://localhost:3000/todo/${id}`,
            headers : { jtoken : localStorage.getItem('token')},
            data : data
        })
        .done(response => {
            this.clear()
            if( id_group ){
               Group.findById( id_group )
            }else{
                this.read()
            }
            $('#modalUpdate').modal('hide')
        })
        .fail( ({ responseJSON}) => {
            console.log( responseJSON )
            responseJSON.path.forEach((path, index) => {
                $(`#${path}_update`).addClass('is-invalid');
            })
        })
    },
    done : function(id){
        $.ajax({
            method : 'PUT',
            url : `http://localhost:3000/todo/${id}`,
            headers : { jtoken : localStorage.getItem('token')},
            data :{ status : true}
        })
        .done( response => {
            if( id_group ){
                Group.findById( id_group )
             }else{
                 this.read()
             }
        })
        .catch( error =>  {
            console.log()
        })
    },
    delete : function(){
        let id = $('#id_delete').val()
        $.ajax({
            method :'DELETE',
            url : `http://localhost:3000/todo/${id}`,
            headers : { jtoken : localStorage.getItem('token')}
        })
        .done( response => {
            if( id_group ){
                Group.findById( id_group )
             }else{
                 this.read()
             }
            $('#modalDelete').modal('hide')
        })
        .fail( error => {
            console.log('error while delete todo :', error.message)
        })
    }
}
