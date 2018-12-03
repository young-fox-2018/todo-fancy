# todo-fancy
API Documentation yang meliputi : url, http method, input, output (success dan error case)

| URL             | Method | Description           |
|-----------------|--------|-----------------------|
| /users/register | POST   | Register new user     |
| /users/login    | POST   | Sign In with email    |
| /users/loginFB  | POST   | Sign In with facebook |
| /todo | GET   | Read all todo list |
| /todo  | POST   | Create new todo |
| /todo  | PUT   | Update todo |
| /todo  | Delete   | Delete todo |

**Register**
----

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **Input:**
 
   `username:String, email:String, password:String` 

* **Success Response:**

  * **Code:** 201 <br/>
    **Content:** `{ _id : <ObjectId>, username : <username>, email : <email>, password : <password>}`

**Sign In**
----

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **Input:**
 
   `email:String, password:String` 

* **Success Response:**

  * **Code:** 200 <br/>
    **Content:** `message: Sign successfull`

**Create new to do**
----

* **URL**

  /todo

* **Method:**

  `POST`
  
*  **Input:**
 
   `name: String, description: String, dueDate: String` 

* **Success Response:**

  * **Code:** 201 <br/>
    **Content:** `message: Successfully added to list`

**Read to do list**
----

* **URL**

  /todo

* **Method:**

  `GET`
  
*  **Input:**
 
   `none` 

* **Success Response:**

  * **Code:** 201 <br/>
    **Content:** `{
        title: name,
        description: description,
        due date; dueDate,
    }`

**Delete to do**
----

* **URL**

  /todo

* **Method:**

  `Delete`
  
*  **Input:**
 
   `id: ObjectId` 

* **Success Response:**

  * **Code:** 201 <br/>
    **Content:** `message: Successfully deleted`

**Update to do**
----

* **URL**

  /todo

* **Method:**

  `PUT`
  
*  **Input:**
 
   `id: ObjectId, params: req.body` 

* **Success Response:**

  * **Code:** 201 <br/>
    **Content:** `message: Successfully update`



