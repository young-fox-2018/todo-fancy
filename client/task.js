$(document).ready(function() {
    console.log("script user run")

    $ajax({
        method: 'GET',
        url: "http://localhost:3000/tasks/showall"
    })
    .done(function(tasks) {
        $.each(tasks, function() {
            $('#completeTask').append(`
                <p>${tasks.description}</p>
            `)
        })
    })
    .fail(function(err) {
        console.log(err)
    })

})