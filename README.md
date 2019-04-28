# todo-fancy
Good Luck 🔥

# API Documentation

## Register API

1. Url : http://localhost:3000/register | **POST**
2. Body : 

    ```json
        {
            "name": "rangga",
            "email": "rangga@mail1.com",
            "password": "rangga"
        }
    ```
3. Params : -
4. Header: -
5. Status code: 200 | 400
6. Response:
    ```json
    {
        "todos": [],
        "loginMethod": "Register",
        "_id": "5c04a4e8f5fcf90dd3a33781",
        "name": "rangga",
        "email": "rangga@mail1.com",
        "password": "$2a$10$/ccTVlKC0vc/fkdFmdY6EOT4b.Zs.nAUZ2feWtX6h6u6miwYqwsGK",
        "__v": 0
    }
    ```

## Login API

1. Url : http://localhost:3000/login | **POST**
2. Body : 

    ```json
    {
        "email": "rangga@mail.com",
        "password": "rangga"
    }
    ```
3. Params : -
4. Header: -
5. Status code: 200 | 400
6. Response:
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzAzMzA1ZWI4ZmYxNjY1YmNlYWFkOTgiLCJuYW1lIjoicmFuZ2dhIiwiZW1haWwiOiJyYW5nZ2FAbWFpbC5jb20iLCJpYXQiOjE1NDM3NDY1Njl9.FHS-lpvsj46iZra-qWvbsKgBRkTgCEVplJwzyJtKcpw"
    }
    ```
## Google Login API


1. Url : http://localhost:3000/users/ | **GET**
2. Body : -
3. Params : 
    ```
    {
        token: your_id_token
    }
    ```
4. Header: -
5. Status code: 200 | 400
6. Response:
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzAzMzA1ZWI4ZmYxNjY1YmNlYWFkOTgiLCJuYW1lIjoicmFuZ2dhIiwiZW1haWwiOiJyYW5nZ2FAbWFpbC5jb20iLCJpYXQiOjE1NDM3NDY1Njl9.FHS-lpvsj46iZra-qWvbsKgBRkTgCEVplJwzyJtKcpw"
    }
    ```


## Middleware verify Token API


1. Url : localhost:3000/users/ | **POST**
2. Body : -
3. Params : 
4. Header: 
    ```json
    {
        "Auth": "AUTH-TOKEN"
    }
    ```
5. Status code: 200 | 400
6. Response:
    ```json
    {
        "name": "rangga kusuma",
        "email": "ranggavskusuma@gmail.com",
        "iat": 1543772373
    }
    ```

## Create Todo API

1. Url : localhost:3000/todos | **POST**
2. Body : 

    ```json
    {
        "name": "belajar nodejs",
        "description": "belajar materi callback",
        "dueDate": "10/10 /2018"
    }
    ```
3. Params : -
4. Header: 
    ```json
    {
        "Auth": "AUTH-TOKEN"
    }
    ```
5. Status code: 200 | 400
6. Response:
    ```json
    {
        "todos": [
            "5c041a9ffbd2725b60075876",
            "5c041bf06de82f5d29a29fe5",
            "5c041c4d3812425d9c145590"
        ],
        "loginMethod": "Google",
        "_id": "5c041a88fbd2725b60075875",
        "name": "rangga kusuma",
        "email": "ranggavskusuma@gmail.com",
        "password": null,
        "__v": 0
    }
    ```

## Find All user's Todos API


1. Url : localhost:3000/todos | **GET**
2. Body : -
3. Params : -
4. Header: 
    ```json
    {
        "Auth": "AUTH-TOKEN"
    }
    ```
5. Status code: 200 | 400
6. Response:
    ```json
    {
    "todos": [
        {
        "status": false,
        "_id": "5c041a9ffbd2725b60075876",
        "name": "belajar nodejs",
        "description": "belajar materi callback",
        "dueDate": "2018-10-09T17:00:00.000Z",
        "__v": 0
        },
        {
        "status": false,
        "_id": "5c041bf06de82f5d29a29fe5",
        "name": "belajar nodejs",
        "description": "belajar materi callback",
        "dueDate": "2018-10-09T17:00:00.000Z",
        "__v": 0
        },
        {
        "status": false,
        "_id": "5c041c4d3812425d9c145590",
        "name": "belajar nodejs",
        "description": "belajar materi callback",
        "dueDate": "2018-10-09T17:00:00.000Z",
        "__v": 0
        },
        {
        "status": false,
        "_id": "5c041c4e3812425d9c145591",
        "name": "belajar nodejs",
        "description": "belajar materi callback",
        "dueDate": "2018-10-09T17:00:00.000Z",
        "__v": 0
        }
    ],
    "loginMethod": "Google",
    "_id": "5c041a88fbd2725b60075875",
    "name": "rangga kusuma",
    "email": "ranggavskusuma@gmail.com",
    "password": null,
    "__v": 0
    }
    ```

## Find One Todo API


1. Url : localhost:3000/todos/:todoId | **GET**
2. Body : -
3. Params : 
4. Header: 
    ```json
    {
        "Auth": "AUTH-TOKEN"
    }
    ```
5. Status code: 200 | 400
6. Response:
    ```json
    {
        "status": false,
        "_id": "5c03306ab8ff1665bceaad99",
        "name": "belajar nodejs",
        "description": "belajar materi callback",
        "dueDate": "2018-10-09T17:00:00.000Z",
        "__v": 0
    }
    ```

## Update Todo API


1. Url : localhost:3000/todos/:todoId | **PUT**
2. Body : 
    ```json
    {
        "name": "nodejs cuy",
        "description": "materi promise",
        "dueDate": "10/11/2018"
    }
    ```
3. Params : 
4. Header: 
    ```json
    {
        "Auth": "AUTH-TOKEN"
    }
    ```
5. Status code: 200 | 400
6. Response:
    ```json
    {
        "status": false,
        "_id": "5c03306ab8ff1665bceaad99",
        "name": "nodejs cuy",
        "description": "materi promise",
        "dueDate": "2018-10-10T17:00:00.000Z",
        "__v": 0
    }
    ```

# Status Finish Todo API


1. Url : localhost:3000/todos/:todoId | **PATCH**
2. Body : -
3. Params : 
4. Header: 
    ```json
    {
        "Auth": "AUTH-TOKEN"
    }
    ```
5. Status code: 200 | 400
6. Response:
    ```json
    {
        "status": true,
        "_id": "5c03306ab8ff1665bceaad99",
        "name": "nodejs cuy",
        "description": "materi promise",
        "dueDate": "2018-10-10T17:00:00.000Z",
        "__v": 0
    }
    ```
## Delete Todo API


1. Url : localhost:3000/todos/:todoId | **DELETE**
2. Body : -
3. Params : 
4. Header: 
    ```json
    {
        "Auth": "AUTH-TOKEN"
    }
    ```
5. Status code: 200 | 400
6. Response:
    ```json
    {
        "todos": [
            "5c03306ab8ff1665bceaad99"
        ],
        "_id": "5c03305eb8ff1665bceaad98",
        "name": "rangga",
        "email": "rangga@mail.com",
        "password": "$2a$10$/YLpLeWQ22GiD.qUoFBs0uchInqnIwhtIrP3CH2ezEQg.y9kNzi62",
        "__v": 0
    }
    ```
