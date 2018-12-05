# todo-fancy
Good Luck 🔥

#### REST API
**List of user routes:**


| Route | HTTP | Data Params | Description | Success Response | Error Response |
| ------|------| ------ | ------------ | ------ | ------- |
| /users/register | POST | `{"email": string, "password": string}` | Create account for new user | Code: 200<br>Message: "Success create new user" | Code: 500<br>Message: "Error create new user"
| /users/login | POST | `{"email": string, "password": string}` | Login in and get jwt token | Code: 200<br>Message: "Successfully login" | Code: 400/500<br>Message: "Wrong password"/"User not found"/"Error finding user"
| /users/loginfb | POST | `{"token"}` | Login by facebook and get jwt token | Code: 200<br>Message: "Login with fb successfully"/"Success create new user" | Code: 500<br>Message: "Error finding user"/"Error create new user"
| /users | GET | `{"token"}` | Get user info with list of todos | Code: 200<br>Message: "Detail user todos" | Code: 500<br>Message: "Error getting all user data"

**List of todo routes**


| Route | HTTP | Data Params |  Description | Success Response | Error Response |
| ------|------| -------- | ------------ | ------ | ------- |
| /todos | POST | `{"title": string, "description": "string", "due_date": Date}` | Create new todo | Code: 200<br>Message: "Success create new todo" | Code: 500<br>Message: "Error create new todo"
| /todos/:id | PUT | `{"title": string, "description": "string", "due_date": Date, "status": string}` | Update user's todo | Code: 200<br>Message: "Success update todo" | Code: 400/500<br>Message: "User not found"/"Error update todo"/"Error finding user"
| /todos/:id | DELETE | `{}` | Delete user's todo | Code: 200<br>Message: "Success delete todo" | Code: 400<br>Message: "No todo with that id"/"Error delete todo"


ENV:
SECRET=SECRETPASSWORDNOONESHOULDKNOW

Link Deploy = soon
Fitur Tambahan = -
Kendala = 
* penggunaan user findone and create still redundant. needs to refactor in the future
* verifikasi token setiap melakukan action, jadi di dalam todo controller masih banya user findone
* sempat stuck mencari hooks after delete todo