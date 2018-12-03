let member = []
let id_group = null
const Group = {
    display : function( groups ){
        console.log( groups)
            $('#list-project').empty()
            
            groups.forEach( group => {
                let image_tamplate = ''
                group.peoples.forEach(people => {
                    image_tamplate +=`<img src="${people.picture}" class="rounded-circle" style="width:50px">`
                })
                let template = `
                    <div class="col-sm-6 mb-2">
                        <div class="card-header">
                            <div class="d-flex justify-content-start align-items-baseline">
                              ${image_tamplate}
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${group.name}</h5>
                                <p class="card-text">${group.description}</p>
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <button onClick="Group.findById('${group._id}')" class="btn btn-info">Detail</button>
                                </div>                                
                            </div>
                        </div>
                    </div>
                `
                $('#list-project').append(template)
            })
    },
    findById : function( id ){
        id_group = id
        $.ajax({
            method : 'GET',
            url : 'http://localhost:3000/groups/'+id,
            headers : { jtoken : localStorage.getItem('token')}
        })
        .done( group => {
            $('#detail-group').empty()
            $('#list-group').hide()
            let member_template = ''
            group.peoples.forEach(people => {
                member_template += `
                        <div class="mr-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <img style="width:50px" class="rounded-circle mr-3" src="${people.picture}" alt="member image">
                                <h5>${people.name}</h5>
                            </div>
                        </div>
                `
            })
            let list_todo = $('<div></div>').addClass('row container mt-2')
            list_todo.empty()
            group.todoes.forEach(todo => {
                let template = `
                <div class="col-sm-6 mb-2">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-baseline">
                            <p class="font-weight-bold"> ${todo.user.name} </p>
                            <div>
                                <img src="${todo.user.picture}" class="rounded-circle" style="width:50px">
                            </div>
                           
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${todo.name}</h5>
                            <p class="card-text">${todo.description}</p>
                            <p>${todo.due_status}</p>
                            <p>${todo.status}</p>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <button ${todo.status=== true ? 'disabled' : ''} class="btn btn-info"
                                    data-toggle="modal" 
                                    data-target="#modalUpdate"

                                    data-id="${todo._id}"
                                    data-name="${todo.name}"
                                    data-description="${todo.description}"
                                    data-due_status ="${todo.due_status}">Update

                                </button>
                                <button onClick="Todo.done('${todo._id}')" class="btn btn-danger">Done</button>
                                <button ${todo.status=== true ? 'disabled' : ''} data-toggle="modal" data-target="#modalDelete" data-id="${todo._id}" class="btn btn-danger">Delete</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            `
               list_todo.append( template )
            })


            let template = `
                <div class="card" style="width:100%">
                    <img class="card-img-top" src=".../100px180/" alt="Card image cap">
                    <div id="list-todo-group" class="card-body">
                        <h3 class="card-title font-weight-bold">${group.name}</h3>
                        <p class="card-text">${group.description}</p>
                        <h5 class="font-weight-bold">Member :</h5>
                        <div class="d-flex">
                          ${member_template}
                        </div>
                        <h3> List Todo : </h3>
                    </div>
                </div>
            `
            $('#detail-group').append( template )
            $('#detail-group').append( list_todo )
            $('#detail-group').show()
        })
        .fail( ({ responseJSON }) => {
            console.log( responseJSON.message)
        })
    },
    read : function(){
        $.ajax({
            method : 'GET',
            url : 'http://localhost:3000/groups',
            headers : { jtoken : localStorage.getItem('token')}
        })
        .done( groups => {
            this.display( groups )  
        })
        .fail( ({ responseJSON}) => {
            console.log('error while read group :', responseJSON)
        })
    },
    searchMember :function(){
        let key = $('#search_key').val()
        $.ajax({
            method : 'GET',
            url : `http://localhost:3000/users?name=${key}`,
            headers : {jtoken : localStorage.getItem('token')}
        })
        .done( users => {
            console.log( users )
            $('#member').empty()
            if( users.length !== 0){
                users.forEach(user => {
                    console.log( user )
                    let template = `<div onClick="Group.waiting_member('${user._id},${user.name}, ${ user.picture}')"class="dropdown-item">
                                            <div class="d-flex align-items-baseline">
                                                <p class="font-weight-bold">${user.name}</p>
                                                <div>
                                                    <img class="rounded-circle" style="width:50px" src="${user.picture}">
                                                </div>
                                            </div>
                                    </div>`
                    $('#member').append( template )
                })
            }else{
                $('#member').append( `<h3> Tidak ada Result </h3>` )
            }
           $('.dropdown-toggle').dropdown()

        })
        .fail( error => {
            console.log('error while read user :', error)
        })
    },
    waiting_member : function( user ){
        user = user.split(',')
        member.push( user )
    },
    clear : function(){
        $('#group_name').val()
        $('#group_description').val()
    },
    create : function(){
        let peoples = member.map( user => { return user[0]})
        let name = $('#group_name').val()
        let description = $('#group_description').val()
        $.ajax({
            method : 'POST',
            url  : 'http://localhost:3000/groups',
            headers : { jtoken : localStorage.getItem('token')},
            data : { peoples : JSON.stringify(peoples) , name, description },
            dataType : "json"
        })
        .done( response => {
            $('#add-group').modal('hide')
            this.clear()
            this.read()
        })
        .fail( (error) => {
            console.log('Error while creating group:', error)
        })
    }
}
