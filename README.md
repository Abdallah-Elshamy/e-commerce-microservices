# E-commerce Microservices
A simple e-commerce cloud application that is refactored into a microservice architecture. It allows admins of the shop to add products that users can buy. The users can add the products they like into their cart and place orders.

# Technologies
* [NodeJS](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Docker](https://www.docker.com/)
* [Kubernetes](https://kubernetes.io/)
* [NGINX](https://www.nginx.com/)
* [Travis CI](https://travis-ci.org/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-javascript/)
* [Mongoose](https://mongoosejs.com/)
* [JWT](https://jwt.io/)

# Backend
The backend consists of four microservices. One of them is an NGINX reverse proxy server. The other three are [Express.js](https://expressjs.com/) servers that contain the main logic of the app.

To know more about the backend, read its [README](./backend/README.md).

# Frontend
The frontend consists of a single microservice. This microservice is a [React](https://reactjs.org/) app that uses [Redux](https://redux.js.org/) to manage the state of the app.

The frontend was created with the help of this [tutorial](https://www.youtube.com/watch?v=Fy9SdZLBTOo).

To know more about the frontend, read its [README](./frontend/README.md)

# Deployment
All the microservices are containerized using [Docker](https://www.docker.com/). Those containers are orchestrated using [Kubernetes](https://kubernetes.io/).

To deploy the app, you will need the [Kubernetes command-line tool](https://kubernetes.io/docs/tasks/tools/install-kubectl/). You can also use [Travis CI](https://travis-ci.org/) but don't forget to modify the `.travis.yml` file.
After you do this do the following:
1. Create the `backend-secret` that contains the secrets and environment variables needed by the backend microservices. You can create it using this command:

```bash
kubectl create secret generic secret-backend 
--from-literal=MONGODB_URL='<YOUR_DATABASE_URL>' 
--from-literal=JWT_SECRET='<KEY_USED_FOR_JWT>' 
--from-literal=AWS_REGION='<YOUR_AWS_REGION>' 
--from-literal=AWS_PROFILE='<YOUR_AWS_PROFILE>' 
--from-literal=AWS_BUCKET='<AWS_BUCKET_THAT_STORES_PRODUCT_IMAGES>'
```
2. After you create the secret, you can navigate into the directory of each microservice (frontend and backend), and run the following commands to deploy the services on your cluster:
```bash
kubectl apply -f service.yml
kubectl apply -f deployment.yml  
```