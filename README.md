# Arnold's Fancy To-Do List

### List of basic routes:
| Routes      | HTTP  | Data Params | Descriptions | Success Response  | Error Response
|----    |---- |--- |---       |---         |---  |---
| /signup | POST  | {"name": string, <br> "email": string, <br>"password": string}| Register new user|Content: <br>*200: -*| Content: <br>*400: {Mesage: "Errornya di signUp"*}|
| /signin | POST |{"email": string, <br>"password": string} | Authenticating the credentials given to the databases|Content: *<br>200: {message: "User Found"} <br>400: {message: "Wrong Password"} <br>404: {message: "Email is not registered"*| Content: <br>*400: {Mesage: "Errornya di signIn"*}|



1. Link Deploy=
2. Fitur Tambahan = null
3. Kendala = 
    - API sign in
    - suka keselip config/require-nya
    - cara refactoring bikin pusing
    - penggunaan verifikasi token masih belum jelas, jadi semuanya masih manual di findOne ke model di Controller