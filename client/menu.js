const toogleMenu = ()=> {
    if ( $('#list-todo').css('display') !== 'none' ){
        console.log('open group')
        $('#list-todo').hide()
        $('#list-group').show()
        id_group = null
        Group.read()
    }else{
        id_group =null
        console.log('open list')
        $('#list-group').hide()
        $('#list-todo').show()
        $('#detail-group').hide()
    }
}