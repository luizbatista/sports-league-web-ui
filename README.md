# Sport League Web UI

The goal of the project is to build a browser based web frontend SPA that gets the data about match schedule/results from the backend and then computes leaderboard based on the rules.

## Install Dependencies

This solution requires NodeJs v20 installed.

In order to install project dependencies run:

> **npm** install

## Running Backend Mock Server

In order to work on the frontend application we have provided a simple mock database server.

To run the mock server run the following command:

> **node** server.js dev-mock-server-config.json

After this you would be able to access backend at http://localhost:3001. To verify if the server is running you can run:

> **curl** http://localhost:3001/api/version

The response should be `{"success": true, "version": "1.0"}`

## Running Frontend Application

The following command will run the SPA in local dev server:

> **npm** start

The application will be available at http://localhost:3000 and by default you should see a welcome message there.

## Production Build

In order to prepare production build you need to run:

> **npm** run build

It is important to make sure that code can be built for production succesfully before submitting the solution.

## Run tests

To run the tests just run this command. 

```shell
npm test
```



