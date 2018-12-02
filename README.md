# todo

## **Table of Contents**
- [Description](#description)
- [URL](#url)
- Methods
    - Registeration
        - [Signup](#signup)
        - [Signin](#signin)
        - [FaceBook Signin](#fbsignin)
    - Todo
        - [Get All Todo](#gettodo)
        - [Create Todo](#create)
        - [Delete Todo](#delete)
        - [Edit Todo](#edit)
    - Project/Invitation
        - [Create Project](#createproject)
        - [Get All Project](#getproject)
        - [Get Invitation](#getinvitation)
        - [Invitate a User](#invite)
        - [Accept Invitation](#acceptinvite)
        - [Get Project Todo](#getprojecttodo)
    - User
        - [Get All Users](#getusers)


## <a id="description"></a> Description
This program is created to train in the proficiency in API Documentation, API CRUD, and in using mongoDB

## <a id="url"></a> URL
http://localhost:3000/todo

## <a id="signup"></a>Methods
Route | HTTP | Description
------|------|------------
/registeration/signup | POST | create a new User

### Data Params
Name: 
- type: String

Email: 
- type: String

Password: 
- type: String

### Success Response

Code: 201

Content: 

    {
        message: "User Created",
        data (example): { 
         "projects": [],
        "_id": "5bfbf9966419d2718270a0a9",
        "name": "Bob",
        "email": "bob@mail.com",
        "password": <hashed password>,
        "__v": 0
        }
    }

### Error Response

Code: 500

Content: 

    {
        message: <error message>,
        note: 'Please see console log for details'
    }

Code: 400

Content:

    {
        message: "Error in encrypting, Please try again"
        OR
        message: "Password must not be empty"
    }

# <a id="signin"></a>Method 
Route | HTTP | Description
------|------|------------
/registeration/signin | POST | login into account

### Data Params
Email: 
- type: String

Password:
- type: String

### Success Response

Code: 200

Content: 

    {
        message: "Signin Success",
        token: <token>,
        name: <user.name>
    }

### Error Response

Code: 400

Content: 

    {
        message: "Error in decrypting password"
        OR
        message: "User does not exist"
        OR
        message: "Invalid password"
    }

Code: 500

Content:

    {
        message: <error.message>, 
        note: 'Please see console log for details'
    }

# <a id="fbsignin"></a>Method 
Route | HTTP | Description
------|------|------------
/registeration/fb-signin | POST | login into using FaceBook

### Data Params
Email: 
- type: String

Name:
- type: String

### Success Response

Code: 200

Content: 

    {
        message: "Login success",
        token: <token>,
        name: <user.name>
    }

### Error Response

Code: 500

Content:

    {
        message: <error.message>, 
        note: 'Please see console log for details'
    } 

# <a id="gettodo"></a>Method 
Route | HTTP | Description
------|------|------------
/todo | GET | get all todo data

### Data Params
None

### Success Response

Code: 200

Content: 

    {
        message: "Data retrieved", 
        data (example):{
            "message": "Data retrieved",
            "data": [
                {
                "status": "Pending",
                "_id": "5bfbf9c16419d2718270a0aa",
                "name": "Task",
                "description": "This is Task",
                "created_date": "Nov 26, 2018",
                "due_date": "Dec 5, 2018",
                "user": "5bfbf9966419d2718270a0a9",
                "project": <if any>
                "__v": 0
                }
            ]
        } 
    }

### Error Response

Code: 500

Content:

    {
        message: "Error",
        note: 'Please see console log for details'
    }

# <a id="create"></a>Method 
Route | HTTP | Description
------|------|------------
/todo | POST | create a new todo

### Data Params
Name: 
- type: String

Description: 
- type: String

due_date:
- type: String (Moment.js)

user:
- type: MongoDB ObjectId

project (optional):
- type: MongoDB ObjectId

### Success Response

Code: 201

Content: 

    {
        message: "Task Created",
        data (example): 
        {
            "status": "Pending",
            "_id": "5bfbfa802acaf672526e82d0",
            "name": "Task for Jane",
            "description": "This is Task for Jane",
            "created_date": "2018-11-25T17:00:00.000Z",
            "due_date": "2018-12-04T17:00:00.000Z",
            "user": "5bfbf9966419d2718270a0a9",
            "project": <if any>
            "__v": 0
        }
    }

### Error Response

Code: 500

Content: 

    {
        message: "Error",
        note: 'Please see console log for details'
    }


# <a id="delete"></a>Method 
Route | HTTP | Description
------|------|------------
/todo/:id | DELETE | delete a todo

### URL Params
id:
- type: String

### Data Params
None

### Success Response

Code: 200

Content: 

    {
        message: "Data deleted", 
    }

### Error Response

Code: 500

Content:

    {
        message: "Error"
        note: 'Please see console log for details'
    }

# <a id="edit"></a>Method 
Route | HTTP | Description
------|------|------------
/todo/:id | PUT | edit a user data based on id

### URL Params
id:
- type: String

### Data Params
Name: 
- type: String

Description: 
- type: String

Status: 
- type: String

due_date:
- type: String (Moment.js)

### Success Response

Code: 200

Content: 

    {
        message: "Data edited", 
    }

### Error Response

Code: 400

Content:

    {
        message: "Status can only be 'Pending' or 'Done'"
    }

Code: 500

Content:

    {
        message: "Error"
        note: 'Please see console log for details'
    }

# <a id="createproject"></a>Method 
Route | HTTP | Description
------|------|------------
/project | POST | create a new project

### Data Params
Name: 
- type: String

currentUserId (retrieved via token): 
- type: Mongo ObjectId

### Success Response

Code: 201

Content: 

    {
        message: "Project Created",
        data (example): 
        {
            "tasks": [],
            "members": [],
            "_id": "5bfd372344accc7599378263",
            "creator": "5bfbe674615233643d90408e",
            "name": "Project Name",
            "__v": 0
        }
    }

### Error Response

Code: 500

Content: 

    {
        message: "Error",
        note: 'Please see console log for details'
    }

# <a id="getproject"></a>Method 
Route | HTTP | Description
------|------|------------
/project | GET | get a list of projects for a specific user

### Data Params
Name: 
- type: String

currentUserId (retrieved via token): 
- type: Mongo ObjectId

### Success Response

Code: 201

Content: 

    {
        message: "Data retrieved",
        data (example): 
        [
            {Containing Projects that belongs to a user}
        ]
    }

### Error Response

Code: 500

Content: 

    {
        message: "Error",
        note: 'Please see console log for details'
    }

# <a id="getinvitation"></a>Method 
Route | HTTP | Description
------|------|------------
/project/invitations | GET | get a list of invitations for a specific user

### Data Params
currentUserId (retrieved via token): 
- type: Mongo ObjectId

### Success Response

Code: 201

Content: 

    {
        message: "Data retrieved",
        data (example): {
            "_id" : ObjectId("5c035d57962981307eef9ace"),
            "status" : "Pending",
            "invitee" : ObjectId("5c022b2a85be1f17a587299d"),
            "project" : ObjectId("5c0226868c758e16ca1164b1"),
            "__v" : 0
        }
        
    }

### Error Response

Code: 500

Content: 

    {
        message: "Error",
        note: 'Please see console log for details'
    }

# <a id="invite"></a>Method 
Route | HTTP | Description
------|------|------------
/project/invite | POST | invite a user to be a part of a project

### Data Params
inviteeId: 
- type: Mongo ObjectId

projectId: 
- type: Mongo ObjectId

### Success Response

Code: 201

Content: 

    {
        message: "Invitation created",
        data (example): {
            "_id" : ObjectId("5c035d57962981307eef9ace"),
            "status" : "Pending",
            "invitee" : ObjectId("5c022b2a85be1f17a587299d"),
            "project" : ObjectId("5c0226868c758e16ca1164b1"),
            "__v" : 0
        }
        
    }

### Error Response

Code: 500

Content: 

    {
        message: "Error",
        note: 'Please see console log for details'
    }

# <a id="acceptinvite"></a>Method 
Route | HTTP | Description
------|------|------------
/project/accept/:invitationId | POST | accept a pending invitation

### URL Params
invitationId: 
- type: Mongo ObjectId

### Data Params
None

### Success Response

Code: 201

Content: 

    {
        message: "Invitation accepted"
    }

### Error Response

Code: 500

Content: 

    {
        message: "Error",
        note: 'Please see console log for details'
    }

# <a id="getprojecttodo"></a>Method 
Route | HTTP | Description
------|------|------------
/project/:projectId | GET | get all todo for a project

### URL Params
projectId: 
- type: Mongo ObjectId

### Data Params
None

### Success Response

Code: 201

Content: 

    {
        message: "Date retrieved",
        data (example): {
            "_id" : ObjectId("5c03982c16404a54bea5c84d"),
            "name" : "from Jane",
            "description" : "Jane Here!!",
            "status" : "Pending",
            "created_date" : "Dec 2, 2018",
            "due_date" : "Dec 5, 2018",
            "user" : ObjectId("5bfbf9966419d2718270a0a9"),
            "project" : ObjectId("5c0226868c758e16ca1164b1"),
            "__v" : 0
        }
    }

### Error Response

Code: 500

Content: 

    {
        message: "Error",
        note: 'Please see console log for details'
    }

# <a id="getusers"></a>Method 
Route | HTTP | Description
------|------|------------
/user/ | GET | get all list of users

### Data Params
None

### Success Response

Code: 201

Content: 

    {
        message: "Date retrieved",
        data (example): {
            "_id" : ObjectId("5bfbe674615233643d90408e"),
            "projects" : [],
            "name" : "Bob",
            "email" : "bob@mail.com",
            "password" : <hashed password>,
            "__v" : 0
        }
    }

### Error Response

Code: 500

Content: 

    {
        message: <err.message>,
        note: 'Please see console log for details'
    }