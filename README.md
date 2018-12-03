# todo-fancy
Good Luck 🔥

#### REST API
List of routes: 
| Route | HTTP | Description |
| ------|------|------------ |
| /users/register | POST | Create account for new user |
| /users/login | POST | Login in and get jwt token |
| /users/loginfb | POST | Login by facebook and get jwt token |
| /users | GET | Get user info with list of todos |
| /users | DELETE | Delete user account from database |
| /todos | GET | Get lists of user's todo |
| /todos | POST | Create new todo |
| /todos/:id | PUT | Update user's todo |
| /todos/:id | DELETE | Delete user's todo |


ENV:
SECRET=SECRETPASSWORDNOONESHOULDKNOW

Link Deploy = soon
Fitur Tambahan = -
Kendala = 
* penggunaan user findone and create still redundant. needs to refactor in the future
* verifikasi token setiap melakukan action, jadi di dalam todo controller masih banya user findone
* sempat stuck mencari hooks after delete todo