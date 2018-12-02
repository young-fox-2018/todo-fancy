# todo-fancy

#### REST API

List of routes: 

| Route | HTTP | Description |
| ------|------|------------ |
| /users/signup | POST | enable user to sign up |
| /users/signin | POST | sign in and get jwt token |
| /users/gsignin | POST | sign in by google and get jwt token |
| /users | GET | enable user to get his/her info |
| /users | PATCH | enable user to update his/her info |
| /users | DELETE | enable user to delete account |
| /todos | POST | create new todo |
| /todos | GET | get list of user's todo |
| /todos | PATCH | update user's todo |
| /todos | DELETE | delete user's todo |

***

* **URL:**  
/users/signup

* **Method:**
`POST`

* **Data Params:**
`{
    username: string,
    email: string,
    password: string
}`

* **Success Response:**
    * **Code:** 201
    * **Content:** `{
        error: null,
        response: {
          id: number,
          username: string,
          email: string,
          password: string
        }
    }`

* **Error Response:**
    * **Code:** 400 | 500
    * **Content:** `{
        error: error message
    }`

***

* **URL:**  
/users/signin

* **Method:**
`POST`

* **Data Params:**
`{
    identity: string,
    password: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** `{
        error: null,
        response: jwt token
    }`

* **Error Response:**
    * **Code:** 400 | 500
    * **Content:** `{
        error: error message
    }`

***

* **URL:**  
/users/gsignin

* **Method:**
`POST`

* **Data Params:**
`{
    id_token: string
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** `{
        error: null,
        response: jwt token
    }`

* **Error Response:**
    * **Code:** 500
    * **Content:** `{
        error: error message
    }`

***

* **URL:**  
/users

* **Method:**
`GET`

* **Headers:**
`{
    Authorization: jwt token
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** `{
        error: null,
        response: {
          id: string,
          username: string,
          email: string
        }
    }`

* **Error Response:**
    * **Code:** 400 | 500
    * **Content:** `{
        error: error message
    }`

***

* **URL:**  
/users

* **Method:**
`PATCH`

* **Headers:** `{
    Authorization: jwt token
}`

* **Params:** `{
    id: string,
    username: string,
    email: string
}`

* **Data Params:** `{
    username: string,
    email: string,
    password: string
}`

* **Success Response:**
    * **Code:** 204

* **Error Response:**
    * **Code:** 400 | 500
    * **Content:** `{
        error: error message
    }`

***

* **URL:**  
/users

* **Method:**
`DELETE`

* **Headers:** `{
    Authorization: jwt token
}`

* **Params:** `{
    id: string,
    username: string,
    email: string
}`

* **Success Response:**
    * **Code:** 204

* **Error Response:**
    * **Code:** 400 | 500
    * **Content:** `{
        error: error message
    }`

***

* **URL:**  
/todos

* **Method:**
`POST`

* **Headers:** `{
    Authorization: jwt token
}`

* **Data Params:** `{
    name: string,
    description: string,
    dueDate: date
}`

* **Success Response:**
    * **Code:** 201
    * **Content:** `{
        error: null,
        response: {
          id: string
          name: string,
          description: string,
          status: string,
          dueDate: date,
          user: string
        }
    }`

* **Error Response:**
    * **Code:** 400 | 500
    * **Content:** `{
        error: error message
    }`

***

* **URL:**  
/todos

* **Method:**
`GET`

* **Headers:** `{
    Authorization: jwt token
}`

* **Params:** `{
    id: string
    name: string,
    description: string,
    dueDate: date
}`

* **Success Response:**
    * **Code:** 200
    * **Content:** `{
        error: null,
        response: {
          id: string
          name: string,
          description: string,
          status: string,
          dueDate: date,
          user: string
        }
    }`

* **Error Response:**
    * **Code:** 400 | 500
    * **Content:** `{
        error: error message
    }`

***

* **URL:**  
/todos

* **Method:**
`PATCH`

* **Headers:** `{
    Authorization: jwt token
}`

* **Params:** `{
    id: string
    name: string,
    description: string,
    dueDate: date
}`

* **Data Params:** `{
    id: string
    name: string,
    description: string,
    dueDate: date
}`

* **Success Response:**
    * **Code:** 204

* **Error Response:**
    * **Code:** 400 | 500
    * **Content:** `{
        error: error message
    }`

***

* **URL:**  
/todos

* **Method:**
`DELETE`

* **Headers:** `{
    Authorization: jwt token
}`

* **Params:** `{
    id: string
    name: string,
    description: string,
    dueDate: date
}`

* **Success Response:**
    * **Code:** 204

* **Error Response:**
    * **Code:** 400 | 500
    * **Content:** `{
        error: error message
    }`

***



