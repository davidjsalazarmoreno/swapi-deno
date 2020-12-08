
## Requirements 

- deno@1.6.0
- denon@2.4.4 
- yarn (for the client)

## Setup

```
# API
$ rm database.sqlite
$ denon create:db

# Client
$ cd client
$ yarn install
```

## Run

```
# API
$ denon start

# Client
$ cd client
$ yarn build
```

And then go to http://localhost:8000


# Dev

## Run E2E


Postman collection