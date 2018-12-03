

**Register**
----
  Returns json data about a single user.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   `None`
 
* **Data Params**
    
    `username=[string]`

    `email=[string]`

    `password=[string]`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : <id>, username : <username>,email:<email>,password:<password> }`
 
* **Error Response:**

  * **Code:** 400 NOT FOUND <br />
    **Content:** `{ error : "Internal server error" }`
 
* **Sample Call:**

**Log In**
----
  Returns token

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**
 
 
* **Data Params**
    
    `email=[string]`

    `password=[string]` 
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "accessToken": <SOMETOKEN>
}`
 
* **Error Response:**

  * **Code:** 400 NOT FOUND <br />
    **Content:** `{ error : "User not found" }`
    * **Code:** 400 NOT FOUND <br />
    **Content:** `{ error : "Your password is invalid!" }`
 
* **Sample Call:**
 
