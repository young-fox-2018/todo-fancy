# todo-fancy 🔥

# REST-API 
***
## Sign Up
***
sign up with new user info
1. URL  `localhost:8080/user/signup`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"name": "anhar",
	"email": "anhar@mail.com",
	"password": "1234",
}

```
5. Success Response
```javascript
CODE : 200

CONTENT :
success alert "success sign up, please re-login to continue"
```
6. Error Response
```javascript
CODE: 400

CONTENT:
error alert "<error text>"
```
***
## Sign In Using Email
***
sign in while get an access token based on credentials
1. URL  `localhost:8080/signinEmail`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"email": "yourmail@mail.com",
	"password": "yourpassword",
}

```
5. Success Response
```javascript
CODE : 200

CONTENT :
( redirect next page )
```
6. Error Response
```javascript
CODE: 400

CONTENT:
error alert "<error text>"
```
***
## Sign In Using Facebook
***
sign in while get an access token based on credentials
1. URL  `localhost:8080/signinFacebook`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
your facebook account
{
	"email": "yourmail@mail.com",
	"password": "yourpassword",
}

```
5. Success Response
```javascript
CODE : 200

CONTENT :
redirect next page
```
6. Error Response
```javascript
CODE: 400

CONTENT:
error alert "<error text>"
```
***
## Sign Out
***
1. URL  `localhost:8080/signout`
2. Method `GET`
3. URL Param `not required`
4. Data Param
```javascript
```
5. Success Response
```javascript
```
6. Error Response
```javascript
```
***
## Create Todo
***
create todo list ( authenticated only )

1. URL  `localhost:8080/task`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript

data: {
  title : 'coding', 
  description: 'daily coding', 
  dueDate: '30/12/2018', 
  token : <your-auth-token>
}

headers: {
      'Authorization': `${token}`
    }

```
5. Success Response
```javascript
CODE : 200
show all todo list
```
6. Error Response
```javascript
CODE: 400
```
***
## Read Todo
***
show all todo list ( authenticated user only )

1. URL  `localhost:8080/task`
2. Method `GET`
3. URL Param 
4. Data Param
```javascript
headers: {
      'Authorization': `${token}`
    }
```
5. Success Response
```javascript
CODE : 200
show all todo list
```
6. Error Response
```javascript
CODE: 400
```
***
## Edit Todo
***
edit todo list ( authenticated user only )
1. URL  `localhost:8080/task`
2. Method `PUT`
3. URL Param `not required`
4. Data Param
```javascript
data: {
      id: '<new id>',
      title: '<new title>',
      description: '<new description>',
      dueDate: '<new date>',
      token: '<your token>'
    },
    headers: {
      'Authorization': `${token}`
    }
```
5. Success Response
```javascript
CODE : 200
```
6. Error Response
```javascript
CODE: 400

CONTENT:

```
***
## Delete Todo
***
delete todo list ( authenticated user only )

1. URL  `localhost:8080/task`
2. Method `DELETE`
3. URL Param 
4. Data Param
```javascript
data: {
      id: '<id todo list>',
      token: '<token>'
    },
headers: {
      'Authorization': `${token}`
    }
```
5. Success Response
```javascript
CODE : 200

CONTENT :

```
6. Error Response
```javascript
CODE: 400

```
