# TODO-FANCY

**Todo Fancy Documentation**
----


  | ROUTE        | HTTP           | DESCRIPTION  |
  | ------------- |:-------------:| :-----:|
  | users/      | POST | signup and create a new user |
  | users/login     | POST      |  signin and get access token jwt |
  | users/googleSignIn | POST      |  signin with google and get access token jwt |
  | users/invitation      | GET | get a single user invitation list info |
  | users/invitation/:id      | PATCH | change the status of single user invitation |
  | users/groups     | GET      |  get a single user group list info |
  | tasks/      | POST | create a new task |
  | tasks/     | GET     |  get user tasks |
  | tasks/:id | DELETE      |  delete user task |
  | tasks/:id      | PUT | update user task |
  | groups/:groupId     | GET      |  show task list of group |
  | groups/      | POST | create a new group |
  | groups/:groupId/invite      | POST | invite a user to group |
  | groups/:groupId      | POST | create a new task in group |
  | groups/:groupId/:id     | PUT | update a group task |


----
USER ROUTES
----
**Register User**

* **URL**

  users/  

* **Method:**

  `POST`

* **Data Params**

  `{
        email: string,
        username: string,
        password: string,
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
          email: string,
          password: string,
          role: string
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

***
**Login User**

* **URL**

  users/login

* **Method:**

  `POST`

* **Data Params**

  `{
        email: string,
        password: string
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
          token: string
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

***
**Sign in With Google**

* **URL**

  users/googleSignIn

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
          "token" : string,
          msg : 'login success'
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

***
**Get List of Single User Invitation**

* **URL**

  users/invitation

* **Method:**

  `GET`

* **HEADERS**

  {
        token: string
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{

            {
              "id": obj id,
              "group": obj id,
              "status": string,
              "sender": obj id,
              "receiver": obj id
            }

    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

***
**Change a Single Invitation Status**

* **URL**

  users/invitation/:id

* **Method:**

  `PATCH`

* **URL Params**

  **Required:**
  `{
        id: obj id
  }`

* **HEADERS**

  `{
        token: string
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
            {
              "msg" : "join group success"
            }
    }`

  OR

  * **Code:** 200 <br />
    **Content:** `{
            {
              "msg" : 'decline group invitation success'
            }
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

***
**Show a Single User Group List**

* **URL**

  users/groups

* **Method:**

  `GET`

* **HEADERS**

  `{
        token: string
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
            [{
              "name" : String,
              "members" : array,
              "owner" : obj id
            }]
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

***
TASK ROUTES
----
**Create Task**

* **URL**

  tasks/  

* **Method:**

  `POST`

* **Data Params**

  `{
        name : string,
        description : string,
        status : string,
        deadline : date,
        userId : obj id
  }`

* **HEADERS**

  `{
        token: string
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
      name : string,
      description : string,
      status : string,
      deadline : date,
      userId : obj id
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

***
**Show user task list**

* **URL**

  tasks/

* **Method:**

  `GET`

* **HEADERS**

  `{
        token: string
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
            [{
              name : string,
              description : string,
              status : string,
              deadline : date,
              userId : obj id
            }]
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

***
**Delete User Task**

* **URL**

  tasks/:id

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**
  `{
        id: obj id
  }`

* **HEADERS**

  `{
        token: string
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
            {
              msg : 'delete success',
              response : response
            }
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
  }`

***
**Update Task**

* **URL**

  tasks/:id

* **Method:**

  `PUT`

* **URL Params**

  **Required:**
  `{
        id: obj id
  }`

* **HEADERS**

  `{
        token: string
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
            {
              msg : 'Task updated',
              response : response
            }
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

----
GROUP ROUTES
----

***
**Get Group Tasks**

* **URL**

  groups/:groupId

* **URL PARAMS REQUIRED**
  `{
    groupId: obj id
    }`

* **Method:**

  `GET`

* **HEADERS**

  {
        token: string
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{

            [{
              name : string,
              status : string,
              description : string,
              deadline : date
            }]

    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

***
**Create Group**

* **URL**

  groups/  

* **Method:**

  `POST`

* **Data Params**

  `{
        name : string,
        owner : string,
  }`

* **HEADERS**

`  {
        token: string
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
      msg : 'Success creating Group'
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

***
**Create Invitation To Group**

* **URL**

  groups/:groupId/invite

* **Method:**

  `POST`

* **HEADERS**

  `{
        token: string
  }`

* **Data Params**

`  {
        email : string,
  }`

* **URL Params Required**

`  {
        groupId : obj id,
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
      msg : 'Success creating Group'
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

***
**Create Task To Group**

* **URL**

  groups/:groupId

* **Method:**

  `POST`

* **HEADERS**

  `{
        token: string
  }`

* **Data Params**

`  {
      name : string,
      description : string,
      status : string,
      deadline : date
  }`

* **URL Params Required**

`  {
        groupId : obj id,
  }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
      msg : 'Success add task to group'
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`

***
**Update Task in Group**

* **URL**

  groups/:groupId/:id

* **Method:**

  `PUT`

* **URL Params**

  **Required:**
  `{    
        groupId : obj id
        id: obj id
  }`

* **HEADERS**

  `{
        token: string
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
            {
              msg : 'Task updated',
              response : response
            }
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      err : err.message
    }`
----
PLACES ROUTES
----
**Get Nearby Place**

* **URL**

  places/:type/:location  

* **Method:**

  `GET`

* **URL Params required**

  `{
        type: string,
        location: string
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
          data : [{
              {places_obj}
          }]
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
      status: 'failed'
      message : err.message
    }`
