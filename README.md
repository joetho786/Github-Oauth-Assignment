# Github Social Login and Repo Creation plugin in Nest JS
## Description
This is a plugin for Nest JS to create a repo in github and login with github. The new repo created will have a dummy readme file added.

The user token and data are also stored in sqlite database for verification and future use.

Handlebars JS is used to create html frontend for the pages.

## Installation
```bash
$ npm install
```
## Running the app
- Make sure to Create an OAuth App in github and add the client id and client secret in the .env file.
- Make sure to add the callback url in the github app as http://localhost:3000/auth/callback
```bash

$ npm run start
```
## Test
```bash
# unit tests
$ npm run test
```
