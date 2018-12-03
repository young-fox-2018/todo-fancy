# USERS-REST API
this api contains  basic information of user has registered.

* URL   : users/register
    * METHOD : POST
    * URL PARAMS : 
        * REQUIRED = - 
        * OPTIONAL = -
    * BODY : 
   ```
   example :
   {
       "name" : 'hokandre',
       "email" : 'hokandre'
       "password" : '123',
   }
   ```
   * SUCCES RESPONSE :
        * code : 200
        * content : 
        ```
        {
            "succes": true
        }  
        ```
  * Error Response :
    * code : 500
    * content : 
    ```
    {
        "path": [
            "name"
        ],
        "message": [
            "Sorry, name must be filled!"
        ]
    }
    ```
* URL   : users/login
    * METHOD : POST
    * URL PARAMS : 
        * REQUIRED = - 
        * OPTIONAL = -
    * BODY : 
   ```
   example :
   ```
   {
       "email" : 'hokandre',
       "password" : '123',
   }
   ```
   * SUCCES RESPONSE :
        * code : 200
        * content : 
        ```
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzA0NmMxNGYxOTQ0NDEzZDhiOTEwNDQiLCJlbWFpbCI6Imhva2FuZHJlQG1haWwuY29tIiwiaWF0IjoxNTQzNzkzNzc2fQ.3GanwWKbNffOV1fPWLGGlxeuYh2CULzJw6j8LWDQxcw",
        "user_id": "5c046c14f1944413d8b91044"
    }
        ```
  * Error Response :
    * code : 404
    * content : 
    ```
    {
        "message": "Password salah!"
    }
    ```
    or
    * code : 400
    * content : 
    ```
    {
        "message": "Username tidak ditemukan"
    }
    ```
    * URL   : users/login
    * METHOD : POST
    * URL PARAMS : 
        * REQUIRED = - 
        * OPTIONAL = -
    * BODY : 
   ```
   example :
   ```
   {
       "email" : 'hokandre',
       "password" : '123',
   }
   ```
   * SUCCES RESPONSE :
        * code : 200
        * content : 
        ```
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzA0NmMxNGYxOTQ0NDEzZDhiOTEwNDQiLCJlbWFpbCI6Imhva2FuZHJlQG1haWwuY29tIiwiaWF0IjoxNTQzNzkzNzc2fQ.3GanwWKbNffOV1fPWLGGlxeuYh2CULzJw6j8LWDQxcw",
            "user_id": "5c046c14f1944413d8b91044"
        }
        ```

* URL   : /users
    * METHOD : GET
    * URL PARAMS : 
        * REQUIRED = - 
        * OPTIONAL = name['string']
    * HEADERS : token
    * BODY : -
    * SUCCES RESPONSE :
        * code : 200
        * content : 
        ```
        [
                {
                    "todoes": [
                        "5c023546a81b3c1f2a7be425",
                        "5c023576a81b3c1f2a7be426",
                        "5c024982beff822ab1f8cec2",
                        "5c03e30eba35fa53bd79975b",
                        "5c03f7d3ba35fa53bd79975c"
                    ],
                    "_id": "5c0221189d21560a7797f0be",
                    "name": "Andre Hok",
                    "email": "hokandre@ymail.com",
                    "picture": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2203559879678142&height=50&width=50&ext=1546235416&hash=AeQC3fcl_ET85Ps_"
                },
                {
                    "todoes": [
                        "5c03453144c6cc11510a38e9",
                        "5c03b2d483f6d74a986b2b65",
                        "5c03b5256fc1764c5b55fc6c",
                        "5c03b9d66fc1764c5b55fc6d"
                    ],
                    "_id": "5c029b35c058474908cb69d1",
                    "name": "andre",
                    "email": "hokandre@mhs.mdp.ac.id"
                },
                {
                    "todoes": [],
                    "_id": "5c046c14f1944413d8b91044",
                    "name": "andre",
                    "email": "hokandre@mail.com"
                }
        ]
        ```
    * Error Response :
        * code : 400
        * content : 
        ```
        {
            "message": "Belum login!"
        }
        ```
* URL   : /todo
    * METHOD : GET
    * URL PARAMS : 
        * REQUIRED = - 
        * OPTIONAL = -
    * HEADERS : token
    * BODY : -
    * SUCCES RESPONSE :
        * code : 200
        * content : 
        ```
        * URL   : /users
    * METHOD : GET
    * URL PARAMS : 
        * REQUIRED = - 
        * OPTIONAL = name['string']
    * HEADERS : token
    * BODY : -
    * SUCCES RESPONSE :
        * code : 200
        * content : 
        ```
        [
                {
                    "todoes": [
                        "5c023546a81b3c1f2a7be425",
                        "5c023576a81b3c1f2a7be426",
                        "5c024982beff822ab1f8cec2",
                        "5c03e30eba35fa53bd79975b",
                        "5c03f7d3ba35fa53bd79975c"
                    ],
                    "_id": "5c0221189d21560a7797f0be",
                    "name": "Andre Hok",
                    "email": "hokandre@ymail.com",
                    "picture": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2203559879678142&height=50&width=50&ext=1546235416&hash=AeQC3fcl_ET85Ps_"
                },
                {
                    "todoes": [
                        "5c03453144c6cc11510a38e9",
                        "5c03b2d483f6d74a986b2b65",
                        "5c03b5256fc1764c5b55fc6c",
                        "5c03b9d66fc1764c5b55fc6d"
                    ],
                    "_id": "5c029b35c058474908cb69d1",
                    "name": "andre",
                    "email": "hokandre@mhs.mdp.ac.id"
                },
                {
                    "todoes": [],
                    "_id": "5c046c14f1944413d8b91044",
                    "name": "andre",
                    "email": "hokandre@mail.com"
                }
        ]
        ```
    * Error Response :
        * code : 400
        * content : 
        ```
        {
            "message": "Belum login!"
        }
        ```
        ```
    * Error Response :
        * code : 400
        * content : 
        ```
        {
            "message": "Belum login!"
        }
        ```
* URL   : /todo
    * METHOD : POST
    * URL PARAMS : 
        * REQUIRED = - 
        * OPTIONAL = -
    * HEADERS : token
    * BODY : 
    ```
        {
            "name" : "testing",
            "description" : "tested",
            "due_status" : "2018-12-05"
        }
        OPTIONAL : GROUP_ID['STRING']
    ```
    * SUCCES RESPONSE :
        * code : 200
        * content : 
        ```
            {
                "createdNewTodo": {
                    "status": false,
                    "_id": "5c0488d5af58b30cb27e96fc",
                    "name": "testing",
                    "description": "tested",
                    "due_status": "2018-12-05T00:00:00.000Z",
                    "user": "5c0221189d21560a7797f0be",
                    "__v": 0
                }
            }
        ```
     * Error Response :
        * code : 400
        * content : 
        ```
        {
            "path": [
                "name"
            ],
            "message": [
                "Sorry, name must be filled!"
            ]
        }
        ```



* URL   : /todo/:id
    * METHOD : PUT
    * URL PARAMS : 
        * REQUIRED = id[numeric]
        * OPTIONAL = -
    * HEADERS : token
    * BODY : 
        ```
        {
            [optional] "name" : "a",
            [optional] "description" :"bb"
            [optional] "due_status" : "2018-12-05"
        }
        ```
    * SUCCES RESPONSE :
        * code : 200
        * content : 
        ```
        {
            "status": false,
            "_id": "5c0488d5af58b30cb27e96fc",
            "name": "xx",
            "description": "tested",
            "due_status": "2018-12-05T00:00:00.000Z",
            "user": "5c0221189d21560a7797f0be",
            "__v": 0
        }
        ```
    * Error Response :
        * code : 401
        * content : 
        ```
        {
            "message": "Tidak memiliki authorize"
        }
        ```
        or
        * code : 400
        * content : 
        ```
        {
            "message": "Belum login!"
        }
        ```
        * code : 400
        * content : 
        ```
        {
            "path": ["name"],
            "message" : ["harus diisi"]
        }
        ```
* URL   : /todo/:id
    * METHOD : DELETE
    * URL PARAMS : 
        * REQUIRED = id[numeric]
        * OPTIONAL = -
    * HEADERS : token
    * BODY : -
    * SUCCES RESPONSE :
        * code : 200
        * content : 
        ```
        {
            "status": false,
            "_id": "5c0488d5af58b30cb27e96fc",
            "name": "xx",
            "description": "tested",
            "due_status": "2018-12-05T00:00:00.000Z",
            "user": "5c0221189d21560a7797f0be",
            "__v": 0
        }
        ```
    * Error Response :
        * code : 401
        * content : 
        ```
        {
            "message": "Tidak memiliki authorize"
        }
        ```


       
     

