**User Register**
----
    sign up with new user info
* **URL**

    /users/register

* **Method**

    `POST`

* **URL Params**

    **Not require:**

* **Data Params**

    ```json
    {
            email: ujang@roger.coi,
            password: ujangsupergans
    }
    ```
* **Success Response** 

    * **Code:** 200
      **Content:** 
    ```json
    {
        msg: success register user,
        data: data
    }
    ```

* **Error Response**

    * **Code:** 400
      **Content:** 
      ```json
      {"err": err}
      ```

**Login User**
----
    sign in user
* **URL**

    /users/login

* **Method**

    `POST`

* **URL Params**

    **Not require:**

* **Data Params**

    ```json
    {
        "email": "contact@ujangroger.com",
        "password": "ujangganteng"
    }
    ```

* **Success Response**

    * **Code:** 200
      **Content:** 
    ```json
    {
     msg: success login   
    "token":                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaUBtYXVsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU0MzIyMTI1MH0jy-MccyEJO2GNWaWunJk9oAK315wjbFtfqExMBLYvgM",
    id: 'as0idasd-ajsd0-'
    }
    ```

* **Error Response**

    * **Code:** 400
      **Content:** 
      **Content:** 
      ```json
      {"msg": 'wrong password'}
      ```
      **Content:** 
      ```json
      {"msg": email was wrong}
      ```
      **Content:** 
      ```json
      {"err": err}
      ```

**add project**
----
    add project to users by id
* **URL**

    /users/addProject

* **Method**

    `POST`

* **URL Params**

    **not require:**

* **Data Params**

    ```json
    {
        projectId: 'ksakjdakjasd0ss0ssjwi99912',
        id: 'asdasd99ads9'
    }
    ```

* **Success Response**

    * **Code:** 200
      **Content:** 
        ```json
        {
            msg: 'success add project'
        }
        ```

* **Error Response**

    * **Code:** 400
      **Content:** 
      ```json
      {"err": err}
      ```

**invite project**
----
add project to users by email
    
* **URL**

    /users/inviteProject

* **Method**

    `POST`

* **URL Params**

    **not require:**

* **Data Params**

    ```json
    {
        projectId: 'ksakjdakjasd0ss0ssjwi99912',
        email: 'ujang@roger'
    }
    ```

* **Success Response**

    * **Code:** 200
      **Content:** 
        ```json
        {
            msg: data
        }
        ```

* **Error Response**

    * **Code:** 400
      **Content:** 
      ```json
      {"err": err}
      ```

**find by email**
----
find users by email
    
* **URL**

    /users/findByEmail

* **Method**

    `POST`

* **URL Params**

    **not require:**

* **Data Params**

    ```json
    {
        email: 'ujang@roger'
    }
    ```

* **Success Response**

    * **Code:** 200
      **Content:** 
        ```json
        {
            msg: data
        }
        ```

* **Error Response**

    * **Code:** 400
      **Content:** 
      ```json
      {"err": err}
      ```

**login google**
----
    login google by oauth
* **URL**

    /googlelogin

* **Method**

    `POST`

* **URL Params**

    **not require**

* **Data Params**

    ```json
    {
        name: ujang roger,
        email: ujang@roger.coi
    }
    ```

* **Success Response**

    * **Code:** 200
      **Content:** 
        ```json
        {
            name: ujan roger,
            email: ujang@roger.coi,
            token: token
        }
        ```

* **Error Response**

    * **Code:** 400
      **Content:** 
      ```json
      {"err": err}
      ```

**create todo list**
----
create new todo list
    
* **URL**

    /todo/create

* **Method**

    `POST`

* **URL Params**

    **not require:**

* **Data Params**

    ```json
    {
        userId: 'bcJcanCKka020W3',
        activity: 'mancing',
        description: 'kalo inget',
        due_date: '2018-10-06'
    }
    ```

* **Success Response**

    * **Code:** 200
      **Content:** 
        ```json
        {
            msg: 'success create todo',
            data: data
        }
        ```

* **Error Response**

    * **Code:** 400
      **Content:** 
      ```json
      {"err": err}
      ```

**find all todo**
----
find all on todo schema
    
* **URL**

    /todo/findAll

* **Method**

    `POST`

* **URL Params**

    **not require:**

* **Data Params**

    ```json
    {
        id: 'mckmDSKmakdMK02'
    }
    ```

* **Success Response**

    * **Code:** 200
      **Content:** 
        ```json
        {
            msg: 'success get all data',
            data: data
        }
        ```

* **Error Response**

    * **Code:** 400
      **Content:** 
      ```json
      {"err": err}
      ```

