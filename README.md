# crud-api

## Setup and Running

    Use node 16.x or higher.
    Clone this repo: $ git clone git@github.com:terra456/crud-api.git.
    Go to downloaded folder: $ cd async-race-api.
    Go to development branch: $ git branch -b development.
    Install dependencies: $ npm install.
    Start server: $ npm run dev.
    Now you can send requests to the address: http://localhost:4000.

## Usage

### Get users
- URL
  /api/users
- Method:
  GET
- Server answer with `status code` **200** and all users records

### Get user by id
- URL
  /api/users/{userId}
- Method:
  GET
- Server answer with `status code` **200** and record with `id === userId` if it exists
- Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
- Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

### Create user
- URL
  /api/users
- Method:
  POST
- Properties:
  - `id` — unique identifier (`string`, `uuid`) generated on server side
  - `username` — user's name (`string`, **required**)
  - `age` — user's age (`number`, **required**)
  - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
- Server answer with `status code` **201** and newly created record
- Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

### Update user
- URL
  /api/users/{userId}
- Method:
  PUT
- Server answer with` status code` **200** and updated record
- Server answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
- Server answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist

### Delite user
- URL
  /api/users/{userId}
- Method:
  DELETE
- Server answer with` status code` **204** if the record is found and deleted
- Server answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
- Server answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist

## Test application
For testing run $ npm run test