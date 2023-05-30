## Description

This repository contains a frontend application that performs arithmetic operations such as addition, subtraction, division, multiplication, and square root and generates random numbers. The application requires user authentication and maintains individual user balances for performing operations.

This project requires a backend application to run, which can be found at [arithmetic-backend](https://github.com/vitoraderaldo/arithmetic-backend).

## Live App
**Staging URL**: 
https://portal-staging.arithmetic-services.click

## Stack
The following technologies are employed in this project:
1. React: Javascript framework used for building user interfaces based on components.
2. Axios: Javascript library used for HTTP communication.
3. Material: Javascript library used for providing components.
4. Cypress: Frontend testing tool.

## Running the service
Ensure that you have already executed the backend application as outlined in [arithmetic-backend](https://github.com/vitoraderaldo/arithmetic-backend).
Afterwards, proceed with running the following commands:
```bash
$ npm run start
```

## Running the tests
Ensure that you have already executed the backend application and the frontend application.
Afterwards, proceed with running the following commands:
```bash
$ npm run test:e2e
```

## Deployment
To deploy the app in staging just run:
```bash
sh npm run deploy:staging
```

Please note that you won't be able to execute this command because you don't have the correct AWS Profile.

