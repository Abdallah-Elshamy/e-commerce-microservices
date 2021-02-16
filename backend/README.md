# Backend
As we mentioned, the backend consists of four microservices. One of them is an NGINX reverse proxy server. The other three are [Express.js](https://expressjs.com/) servers that contain the main logic of the app.

 The three [Express.js](https://expressjs.com/) servers share the following features:
 * They use [MongoDB](https://www.mongodb.com/) as a DBMS.
 * They use [Mongoose](https://mongoosejs.com/) as an ODM.
 * They use [JWT](https://jwt.io/) for authentication and authorization.
 * They use [morgan](https://www.npmjs.com/package/morgan) as a logger.

We will discuss these microservices in detail.

## products-microservice
This microservice contains an [Express.js](https://expressjs.com/) server that handles `/products/` requests. Admins can create, update, delete and get products using this server. Admins can also upload images of the products into an [AWS S3](https://aws.amazon.com/s3/) bucket using [signed URLs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html). Some of the endpoints of this server is protected using [JWT](https://jwt.io/).

## users-microservice
This microservice contains an [Express.js](https://expressjs.com/) server that handles `/users/` requests. Users can create users and login using this server. The passwords of the users are hashed using [bcrypt](https://www.npmjs.com/package/bcrypt). Some of the endpoints of this server is protected using [JWT](https://jwt.io/).

## orders-microservice
This microservice contains an [Express.js](https://expressjs.com/) server that handles `/orders/` requests. Users can create and get orders using this server. The endpoints of this server is protected using [JWT](https://jwt.io/).

## reverseproxy-microservice
This microservice contains an [NGINX](https://www.nginx.com/) server that works as a reverse proxy. The frontend microservice interacts with this server, and the server forwards the request to the microservice that can fulfill it. 