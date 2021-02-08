[![Twitter](https://img.shields.io/twitter/follow/davidjsmoreno.svg?style=social&label=@davidjsmoreno)](https://twitter.com/davidjsmoreno)

![Travis Status](https://img.shields.io/travis/davidjsalazarmoreno/swapi-deno?branch=master)

# SWAPI Clone

This a [SWAPI](https://swapi.dev/) (partial) clone using Deno, Svelte and Tailwind just because.

Please read [the article](soon) if you want to know more about it.

## Requirements 

- deno@1.6.0
- denon@2.4.4 
- yarn (for the client)

## Setup

```
# API
$ cd server
$ rm database.sqlite
$ denon create:db

# Client
$ cd client
$ yarn install
```

## Run

```
# API
$ cd server
$ denon start

# Client
$ cd client
$ yarn dev
```

## Tests


```
# API
$ cd server
$ denon test
```

And then go to [http://localhost:5000](http://localhost:5000/) and play with the request box.

You can also download the [Postman collection](server/SWAPI%20Deno.postman_collection.json).