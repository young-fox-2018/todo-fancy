# todo-fancy
Good Luck 🔥

- ROUTES 

| Routes          | HTTP    | Description                                      |
| --------------- |:-------:| :-----------------------------------------------:|
| /users/signup     | POST    | Sign Up with new user                            |
| /users/signin     | POST    | Sign in get acces token                          |
| /tasks/      | GET     | Get all the task from user login info (user login only)              |
| /tasks/:id  | PUT     | Update status task to Complete |
| /tasks/:id      | DELETE    | Delete task                    |
| /tasks/add  | POST  | Create a new task on user Login          
|

SIGNUP NEW USER:
- URL: 

    /signup

- Method: 

    GET
     
- URL Params: none

    Require:

    fullName=[STRING],

    username=[STRING],

    email=[STRING],

    password=[STRING],

- Success Response:

    Code: 200

    Content: {user}

- Error Response:

    Code: 400

    Content: err.message


SIGNIN USER:
- URL:
    
    /signin

- Method:
    
    POST

- URL Params: none

    Require:

    email=[STRING],

    password=[STRING]

- Success Response:

    Code: 200
 
    Content: token

- Error Response:

    code: 400

    Content: {msg: invalid email}


GET ALL TASKS:
- URL: 

    /tasks

- Method:

    GET

- URL Params: none

    Require:

    On User Login

- Success Response:

    Code: 200

    Content: tasks

-Error Response:

    Code: 400

    Content: err.message


UPDATE STATUS TASK:
- URL:
    
    /tasks/:id

- Method: 

    PUT

- URL Params: id

    Reuire:

    id=[INTEGER]

    On User Login

- Success Response:

    Code: 200

    Content: task

- Error Response:

    Code: 400

    Content: {msg: task not found}


DELETE TASK:
- URL:

    /tasks/:id

- Method: 

    DELETE

- URL Params: id

    Require: 

    id=[INTEGER]

- Success Response:

    Code: 200

    Content: {msg: Success Delete}

- Error Response:

    Code: 400

    Content: err.message


CREATE A NEW TASK:
- URL:

    /tasks/add

- Method:
    
    POST


- URL Params: none


    Require:
    fullName=[STRING],

    username=[STRING],

    email=[STRING],

    password=[STRING],

- Success Response:

    Code: 200

    Content: {task}

- Error Response:

    Code: 400

    Content: {msg: err.message}