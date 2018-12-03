# To Do Fancy

**Sign Up**
----
  Sign in with saved user
* **URL**  :  `/api/login`
* **Method**  :  `POST`
* **URL Params** 

  **Required** : none
* **Data Params** : 
    ```json
    {
        "email" : "[unicode 255 chars max]",
        "password": "[unicode 255 chars max]",
        "firstName": "[unicode 255 chars max]",
        "lastName": "[unicode 255 chars max]",
        "phone": "[unicode 255 chars max]",
        "gender": "[unicode 255 chars max]
    }
    ```
* **Success Response:**

  * **Code:** 200 <br />
    ```json
    {
        "msg": "user login",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhbmhhckBtYWlsLmNvbSIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE1NDMyNzczOTR9.lRovi3K2J9lmS8rEE0ormiBZ-TpLkxcSQmdMhlQV1ps"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `"error"`

**Sign In**
----
  Sign in while get an access token based on credentials
* **URL**

    /api/signin
* **Method**
    `POST`
* **URL Params**

  **Required:**
    
    none
* **Data Params**
    
    None
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "msg": "user login",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhbmhhckBtYWlsLmNvbSIsInJvbGUiOiJtZW1iZXIiLCJpYXQiOjE1NDMyNzczOTR9.lRovi3K2J9lmS8rEE0ormiBZ-TpLkxcSQmdMhlQV1ps"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `"error"`



**Show Single Users**
----
  Get a single task info 

* **URL** : `/api/tasks/:id`

* **Method** : `GET`
  
*  **URL Params**

   **Required** : `id=[integer]`

* **Data Params** : none

* **Success Response:**

  * **Code:** 200 <br />
  
    ```
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `error authorisation`


**Delete Single Task**
----
  Delete a task 

* **URL** : `/api/task/:id`

* **Method** : `DELETE`
  
*  **URL Params**

   **Required** : `id=[integer]`

* **Data Params** : none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "info" : "deleted user id: ${id}"
    
    }
    ```
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `error authorisation`

**Update Single Users**
----
  Update a task with new info (admin and authenticated user)

* **URL** : `/api/tasks/:id`

* **Method** : `PUT`
  
*  **URL Params**

   **Required** : `id=[integer]`

* **Data Params** : 
    ```json
    {
        "key": "new value",
        "key": "new value",
        ...
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
         "msg": "updated user id ${id}"
    
    }
    ```
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `error authorisation`

