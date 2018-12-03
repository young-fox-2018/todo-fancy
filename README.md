# todo-fancy

**Register**
----
 Register user from application

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

    `name=[string]`
    `email=[string]`
    `password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ id : <id>, name : <name>, email: <email>, password: <hashed_password>, }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ errors : {<error_fields> : {<errors_details>: <message>}} }`


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/register",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
