# ROUTES

|       URL              | HTTP    | Description                              |
|:----------------------:|:-------:| :---------------------------------------:|
| /users/signup          | POST    | Sign Up with new user                    |
| /users/signin          | POST    | Sign in get acces token                  |
| /tasks                 | GET     | Get all tasks (authenticated user only)  |
| /tasks                 | POST    | Create a task (authenticated user only)  |
| /tasks/findOne/:taskId | GET     | Get a task (authenticated user only)     |
| /tasks/:taskId         | PUT     | Update a task (authenticated user only)  |
| /tasks/:taskId         | DELETE  | Delete a task (authenticated user only)  |

# User Sign Up
- URL: 

    /users/signup

- Method: 

    POST
     
- URL Params: 
    
    none

- Require:

    firstName: "string"

    lastName: "string"

    username: "string"

    email: "string"

    password: "string"

- Success Response:

    Code: 201

    Content: {msg: "sign up success", newUser}

- Error Response:

    Code: 400

    Content: err.message

# User Sign In
- URL: 

    /users/signin

- Method: 

    POST
     
- URL Params: 
    
    none

- Require:

    username: "string" / email: "string"

    password: "string"

- Success Response:

    Code: 200

    Content: token

- Error Response:

    Code: 400

    Content: err.message

# Get All Tasks
- URL: 

    /tasks

- Method: 

    GET
     
- URL Params: 
    
    none

- Require:

    User authentication

- Success Response:

    Code: 200

    Content: user.tasks

- Error Response:

    Code: 400

    Content: err.message

# Create a Task
- URL: 

    /tasks

- Method: 

    POST
     
- URL Params: 
    
    taskId

- Require:

    User authentication

- Success Response:

    Code: 200

    Content: {msg: 'new task created', newTask, userData}

- Error Response:

    Code: 400

    Content: err.message

# Get a Task
- URL: 

    /tasks/findOne/:taskId

- Method: 

    GET
     
- URL Params: 
    
    none

- Require:

    User authentication

    name: "string"

    description: "string"

    status: "string"

    dueDate: "string"

- Success Response:

    Code: 200

    Content: task

- Error Response:

    Code: 400

    Content: err.message

# Update a Task
- URL: 

    /tasks/:taskId

- Method: 

    PUT
     
- URL Params: 
    
    taskId

- Require:

    User authentication

    name: "string"

    description: "string"

    status: "string"

    dueDate: "string"

- Success Response:

    Code: 201

    Content: {msg: 'update success', updatedTask}

- Error Response:

    Code: 400

    Content: err.message

# Delete a Task
- URL: 

    /tasks/:taskId

- Method: 

    DELETE
     
- URL Params: 
    
    taskId

- Require:

    User authentication

- Success Response:

    Code: 200

    Content: {msg: 'task deleted', result, updatedUserData}

- Error Response:

    Code: 400

    Content: err.message