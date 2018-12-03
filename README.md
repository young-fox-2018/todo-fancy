# todo-fancy
Good Luck 🔥

      URL              | HTTP    | Description                                                |
|:------------------------:|:-------:| :-----------------------------------------------------:|
| /users/register          | POST    | Register new user                                      |
| /users/login             | POST    | log in get acces token                                 |
| /tasks                   | GET     | Get all tasks (authenticated user only)                |
| /tasks/add               | POST    | Create a task (authenticated user only)                |
| /tasks/updated           | PUT     | Update a task (authenticated user only)                |
| /tasks/status            | PUT     | Update a status task(authenticated user only)          |
| /tasks/priority          | PUT     | Update a priority task(authenticated user only)        |
| /tasks/priority          | GET     | Get all tasks status priority (authenticated user only)|
| /tasks                   | DELETE  | Delete a task (authenticated user only)                |



 # User Register
- URL: 
    /users/register 
 - Method: 
     POST
     
- URL Params: 
    none
 - Require:
     name: "string"
     email: "string"
     password: "string"
 - Success Response:
     Code: 200
     Content: {msg: "Registered succes You must log in first}
 - Error Response:
     Code: 400
     Content: err.message

 # User Log In
- URL: 
     /users/login
 - Method: 
     POST
     
- URL Params: 
    
    none
 - Require:
     email: "string"
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


 # add a Task
- URL: 
     /tasks/add
 - Method: 
     POST
     
- URL Params: 
    taskId
 - Require:
     User authentication
     name: "String",
     description: "String",
     status: "Boolean",
     priority: "Boolean",
     dueDate: "Date"
 - Success Response:
     Code: 200
     Content: {msg: 'new task created', newTask, userData}
 - Error Response:
     Code: 400
     Content: err.message
 
# Update a Task
- URL: 
     /tasks/update
 - Method: 
     PUT
     
- URL Params: 
  
 - Require:
     User authentication
     name: "string"
     description: "string"
     dueDate: "string"
 - Success Response:
     Code: 201
     Content: {msg: 'update success', updatedTask}
 - Error Response:
     Code: 400
     Content: err.message

# Status Task
- URL: 
     /tasks/status
 - Method: 
     PUT
     
- URL Params: 
  
 - Require:
     User authentication
 - Success Response:
     Code: 201
     Content: {task}
 - Error Response:
     Code: 400
     Content: err.message

# Updated priority a Task
- URL: 
     /tasks/priority
 - Method: 
     PUT
     
- URL Params: 
  
 - Require:
     User authentication
     priority:Bolean
 - Success Response:
     Code: 201
     Content: {task}
 - Error Response:
     Code: 400
     Content: err.message

# Get priority a Task
- URL: 
     /tasks/priority
 - Method: 
     GET
     
- URL Params: 
  
 - Require:
     User authentication
   
 - Success Response:
     Code: 201
     Content: {task}
 - Error Response:
     Code: 400
     Content: err.message


 # Delete a Task
- URL: 
     /tasks/
 - Method: 
     DELETE
     
- URL Params: 

 - Require:
     User authentication
 - Success Response:
     Code: 200
     Content: {msg: 'task deleted', result, updatedUserData}
 - Error Response:
     Code: 400
     Content: err.message
 
