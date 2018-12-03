# todo-fancy
Good Luck 🔥

# API Documentation


List of user routes: 
Route | HTTP | Description
------|------|------------
/register | POST | enable user to register
/login | POST | user login and get jwt token
/fbLogin | POST | user login facebook and get jwt token
/users/allUsers | GET | read all registered users
/users/invite | GET | user can see all of their project invitation
/users/invite/:projectID/:userID | PATCH | user can send  invitation to other users
/users/approve/:projectID | PATCH | user can approve project invitation
/users/reject/:projectID | PATCH | user can reject project invitation
/task | POST | add new task
/task | GET | read all tasks
/task/pending | GET | read all pending tasks
/task/done | GET | read all completed tasks
/task/:taskID | PATCH | update task
/task/:taskID/done | PATCH | mark task as done
/task/:taskID | DELETE | delete task
/project | POST | add new project
/project | GET | read all projects
/project/:projectID/addTask | POST | add new task in project
/project/:projectID/:taskID | PATCH | update task in project
/project/:projectID | GET | read all tasks in project



***

* **URL:**  
/EXAMPLE

* **Method:**
`POST`

* **Headers:**
`{
    accesstoken: string
}`

* **Data Params:**
`{
    email: string,
    password: string
}`

* **URL Params:**
`{
    email: string,
    password: string
}`

* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        id: number,
        email: string,
        password: string, 
        role: string,
        updatedAt: date,
        createdAt: date
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from signup'
    }`

***

# USERS

* **URL:**  
/register

* **Method:**
`POST`

* **Data Params:**
`{
    name: string,
    email: string,
    password: string
}`

* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        user: {
            id: number,
            email: string,
            password: string, 
            role: string,
            updatedAt: date,
            createdAt: date
        }, 
        message: {
            'Congratulation! You have been registered! Please login to continue.'
        }
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: object,
        message: 'error from creating new user'
    }`

***



* **URL:**  
/login

* **Method:**
`POST`

* **Data Params:**
`{
    email: string,
    password: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        accesstoken: string
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: object,
        message: 'error from login'
    }`
    OR
    * **Code:** 400
    * **Content:** `{
        err: object,
        message: 'invalid password'
    }`
        OR
    * **Code:** 400
    * **Content:** `{
        err: object,
        message: 'email or password field must be filled in'
    }`

***


* **URL:**  
/fbLogin

* **Method:**
`POST`

* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        accesstoken: string,
        message: 'new user has been created and jwt token is generated'
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from facebook login'
    }`

***


* **URL:**  
/users/allUsers

* **Method:**
`GET`

* **Headers:**
`{
    accesstoken: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `[{
        _id: string,
        name: string,
        email: string,
        password: string,
        isFacebook: string,
        invitations: [string]
    }]`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from readAll Users'
    }`

***

* **URL:**  
/users/invite

* **Method:**
`GET`

* **Headers:**
`{
    accesstoken: string
}`


* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        invitations: [string]
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from read all invitations'
    }`

***

***

* **URL:**  
/users/invite/:projectID/:userID

* **Method:**
`PATCH`

* **Headers:**
`{
    accesstoken: string
}`

* **URL Params:**
`{
    projectID: string,
    userID: string
}`

* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        message: `Project invitation has been sent to ${user.email}`
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from sending invitation'
    }`

***


* **URL:**  
/users/approve/:projectID

* **Method:**
`PATCH`

* **Headers:**
`{
    accesstoken: string
}`

* **URL Params:**
`{
    projectID: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        message: `You have been added as a member of group ${project.name}`
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from approve invitation'
    }`

***

* **URL:**  
/users/reject/:projectID

* **Method:**
`PATCH`

* **Headers:**
`{
    accesstoken: string
}`


* **URL Params:**
`{
    projectID: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        message: `You have rejected this invitation`
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from rejecting invitation'
    }`

***

# TASKS

* **URL:**  
/tasks

* **Method:**
`POST`

* **Headers:**
`{
    accesstoken: string
}`

* **Data Params:**
`{
    title: string,
    description: string,
    due_date: string
}`

* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        _id: string,
        status: string,
        description: string,
        due_date: date,
        title: string,
        userID: string,
        createdAt: date,
        updatedAt: date
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from create new task'
    }`

***
* **URL:**  
/tasks

* **Method:**
`GET`

* **Headers:**
`{
    accesstoken: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `[{
        _id: string,
        status: string,
        description: string,
        due_date: date,
        title: string,
        userID: string,
        createdAt: date,
        updatedAt: date
    }]`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from read all tasks'
    }`

***
* **URL:**  
/tasks/pending

* **Method:**
`GET`

* **Headers:**
`{
    accesstoken: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        _id: string,
        status: string,
        description: string,
        due_date: date,
        title: string,
        userID: string,
        createdAt: date,
        updatedAt: date
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from read all pending tasks'
    }`

***
* **URL:**  
/tasks/done

* **Method:**
`GET`

* **Headers:**
`{
    accesstoken: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        _id: string,
        status: string,
        description: string,
        due_date: date,
        title: string,
        userID: string,
        createdAt: date,
        updatedAt: date
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from readAllDone task'
    }`

***
* **URL:**  
/tasks/:taskID

* **Method:**
`PATCH`

* **Headers:**
`{
    accesstoken: string
}`

* **Data Params:**
`{
    title: string,
    description: string,
    due_date: string
}`

* **URL Params:**
`{
    taskID: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        message: `task with ID: ${req.params.taskID} has been updated`
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from updating task'
    }`

***
* **URL:**  
/tasks/:taskID/done

* **Method:**
`PATCH`

* **Headers:**
`{
    accesstoken: string
}`

* **URL Params:**
`{
    taskID: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        message: `task with ID: ${req.params.taskID} has been updated as done`
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from updating task as done'
    }`

***
* **URL:**  
/tasks/:tasksID

* **Method:**
`DELETE`

* **Headers:**
`{
    accesstoken: string
}`

* **URL Params:**
`{
    taskID: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        message: `task with ID ${req.params.taskID} has been deleted`
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from delete task'
    }`

***

# PROJECT

***

* **URL:**  
/projects

* **Method:**
`POST`

* **Headers:**
`{
    accesstoken: string
}`

* **Data Params:**
`{
    name: string
}`

* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        _id: number,
        name: string,
        members: [string], 
        updatedAt: date,
        createdAt: date
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from creating new project'
    }`

***

* **URL:**  
/projects

* **Method:**
`GET`

* **Headers:**
`{
    accesstoken: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** 
    `[{
        _id: number,
        name: string,
        members: [string], 
        updatedAt: date,
        createdAt: date
    }]`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from readAll project'
    }`

***

* **URL:**  
/projects/:projectID/addTask

* **Method:**
`POST`

* **Headers:**
`{
    accesstoken: string
}`

* **Data Params:**
`{
    title: string,
    description: string,
    due_date: string
}`

* **URL Params:**
`{
    projectID: string
}`

* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        _id: string,
        status: string,
        description: string,
        due_date: date,
        title: string,
        userID: string,
        createdAt: date,
        updatedAt: date
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from add new task to project'
    }`

***

* **URL:**  
/projects/:projectID/:taskID

* **Method:**
`PATCH`

* **Headers:**
`{
    accesstoken: string
}`

* **Data Params:**
`{
    title: string,
    description: string,
    due_date: string
}`

* **URL Params:**
`{
    projectID: string,
    taskID: string
}`

* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `{
        message: `task ID ${req.params.taskID} has been updated`
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: `error from updating task in project`
    }`

***

* **URL:**  
/projects/:projectID

* **Method:**
`GET`

* **Headers:**
`{
    accesstoken: string
}`

* **URL Params:**
`{
    projectID: string
}`

* **Success Response:**
    * **Code:** 201
    * **Content:** 
    `[{
        _id: string,
        status: string,
        description: string,
        due_date: date,
        title: string,
        userID: string,
        createdAt: date,
        updatedAt: date
    }]`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        err: err,
        message: 'error from readAllTask in project'
    }`