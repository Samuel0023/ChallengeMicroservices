# Challenge - Tecnosoftware

The project consists of 4 parts
- DB - PostgreSQL
- Products - microservice
- Provisioning - microservice
- Gateway - apiGateway
- Frontend
## DB

install pgAdmin or similar db administration

- Port: 5432
- username: postgres
- password: admin

### Products

First, run `yarn` to install all dependencies

Second, run `yarn start` to start the microservice

It is the microservice in charge of CRUD operations together with the DB

## Provisioning

First, run `yarn` to install all dependencies

Second, run `yarn start` to start the microservice

It is the one that executes the initial scripts to build the database and also consult the categories and types of status


## Gateway

First, run `yarn` to install all dependencies

Second, run `yarn start` to start the microservice

It is the one that acts as an intermediary between the different microservices and the front end app.

## Frontend

First, run `yarn` to install all dependencies

Second, run `yarn dev` to start the microservice

is the view of the list of existing products