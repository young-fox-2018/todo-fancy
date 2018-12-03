# TO-DO FANCY

### Below are the URLs and the operations associated with them.
---
| Method | URL | Description | 
| ------ | ------ | ------ | ------ | 
| POST | ````/users/register```` | Submiting user's registration data | 
| POST | ````/users/login```` | Login and generate jwt token | 
| POST | ````/users/login-fb```` | Login with 3rd party API from facebook | 
| POST | ````/tasks```` | Submiting new to-do input | 
| GET | ````/tasks```` | Listing all to-do-list from database mongo | 
| PUT | ````/tasks/:id```` | Edit selected to-do item | 
| PATCH | ````/tasks/editStatus/:id```` | Edit status from selected to-do item | 
| DELETE | ````/tasks/:id```` | Delete selected to-do item | 

* **URL:**  
/users/register
* **Method:**
`POST`
 * **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        username: string,
        email: string,
        password: string,
        loginSource: string
    }`
 * **Error Response:**
    * **Code:** 400
    * **Content:** `{
        message: err.message
    }`
 ***

 * **URL:**  
/users/login
* **Method:**
`POST`
 * **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        email: string,
        password: string
    }`
 * **Error Response:**
    * **Code:** 400
    * **Content:** `{
      message: err.message
    }`
 ***

 * **URL:**  
/users/login-fb
* **Method:**
`POST`
 * **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        link: string
    }`
 * **Error Response:**
    * **Code:** 400
    * **Content:** `{
        message: err.message
    }`
 ***
 * **URL:**  
/tasks
* **Method:**
`POST`
 * **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        title: string,
        description: string,
        date: date,
        status: boolean
    }`
 * **Error Response:**
    * **Code:** 400
    * **Content:** `{
        message: err.message
    }`
 ***
 * **URL:**  
/tasks
* **Method:**
`GET`
 * **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        title: string,
        description: string,
        date: date,
        status: boolean
    }`
 * **Error Response:**
    * **Code:** 400
    * **Content:** `{
        message: err.message
    }`
 ***
  * **URL:**  
/tasks/:id
* **Method:**
`PUT`
 * **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        title: string,
        description: string,
        date: date
    }`
 * **Error Response:**
    * **Code:** 400
    * **Content:** `{
        message: err.message
    }`
 ***
  * **URL:**  
/tasks/editStatus/:id
* **Method:**
`PATCH`
 * **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        status: boolean
    }`
 * **Error Response:**
    * **Code:** 400
    * **Content:** `{
        message: err.message
    }`
 ***
  * **URL:**  
/tasks/:id
* **Method:**
`DELETE`
 * **Success Response:**
    * **Code:** 200
    * **Content:** 
    `{
        title: string,
        description: string,
        date: date,
        status: boolean
    }`
 * **Error Response:**
    * **Code:** 400
    * **Content:** `{
        message: err.message
    }`
 ***