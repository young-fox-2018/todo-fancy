# todo-fancy
Good Luck 🔥


``` env
GoogleClientId=41412806340-mn87rmn3kcph7b72o544nbcq4s3bf7qg.apps.googleusercontent.com
GoogleClientSecret=B4OVwJdrfEs21_tz_fjBneeT
jwtSecret=rahasia
```

## User's API

URL | Method | Description | data params | success users
--- | --- | --- | --- | --- 
localhost/users/ | GET | Get all Users | none | all users Array
localhost/users/:id | GET | Get specific | query(id: integer) | specific users (object)
localhost/users/ | Post | create new record for tabl User | body(name: string, email: string, password: string) | Message : `You sucessfully created user with id :ID`
localhost/users/signIn | POST | find specific user and check password then return token | body(email: string, password: string) | token (object)
localhost/users/checkToken | POST | check if token valid | body(token: objectId) | none
localhost/users/fbSignIn | POST | Get specific | body(token: ObjectID) | token (object)

## Task's API

URL | Method | Description | data params | success users
--- | --- | --- | --- | --- 
localhost/tasks/ | GET | Get all task | none | all users Task
localhost/tasks/ | GET | Get all task | body(title: string, description: string, dueDate: date) query(user: objectId) | Message : `You sucessfully created a task`
localhost/tasks/:id | Delete | delete specific task on task table and users table | query(id: objectId) | Message : `You sucessfully deleted a task`
localhost/tasks/:id | PUT | edit specific task | _optional (title:string, description: string, status: string, dueDate: date) | `You sucessfully edit a task`




# Kendala:
hook untuk delete sampai sekarang belom ketemu
maka diakalin langsung di controller
