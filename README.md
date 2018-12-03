# Arnold's Fancy To-Do List

### List of basic routes:
| Routes      | HTTP  | Data Params | Descriptions | Success Response  | Error Response
|----    |---- |--- |---       |---         |---  |---
| /signup | POST  | {"name": string, <br> "email": string, <br>"password": string}| Register new user|Content: <br>*200: -*| Content: <br>*400: {Mesage: "Errornya di signUp"*}|
| /signin | POST |{"email": string, <br>"password": string} | Authenticating the credentials given |Content: *<br>200: {message: "User Found"} <br>400: {message: "Wrong Password"} <br>404: {message: "Email is not registered"*| Content: <br>*400: {Mesage: "Errornya di signIn"*}|
| /loginFB | POST | {"token": token} | Authenticating Facebook Token which include the email and name. It will generate new account if user signed in using FB for the first time and only return token when they have signed in before| Content: <br>200: "created a new account using FB login" and return token | Content: <br>500: "Axios error" / "Error in creating new FB User"

### List of user routes:
| Routes      | HTTP  | Data Params | Descriptions | Success Response  | Error Response
|----    |---- |--- |---       |---         |---  |---
| /users | POST | {"token": token} | Showing all tasks that the User have in their to-do list | Content: <br>200: "List of tasks of the user" | Content: <br>400: "Error in getting task list"

### List of tasks routes:
| Routes      | HTTP  | Data Params | Descriptions | Success Response  | Error Response
|----    |---- |--- |---       |---         |---  |---
|/|POST| {"token": token, "name": string, "description": string, "dueDate": Date}| Creating a task for the user based on the input|Content: <br>200: "Created a new task" | Content: <br>500: "Error in creating new Task" / "You don't have access" / "Error in Verify Token"
|/|DELETE| {"token": token, "taskId": string}|Delete a particular task of a user| Content: <br>200: "Deleted task successfully" | Content: <br>500: "Error in deleting task" / "Task is not found" / "Error in findByIdAndUpdate" / "Error di verification token"
|/|PATCH| {"token": token, "taskId": string}|Updating the status of a particular task into finished |Content: <br>200: "Status updated successfully" | Content: <br>500: "Error in updating task status" / "Task is not found" / "Error in findByIdAndUpdate" / "Error di verification token" 


1. Link Deploy=
2. Fitur Tambahan = null
3. Kendala = 
    - API sign in
    - suka keselip config/require-nya
    - cara refactoring bikin pusing
    - penggunaan verifikasi token masih belum jelas, jadi semuanya masih manual di findOne ke model di Controller
    - Waktu terlalu cepat