# Courier-backend-fullstack

## SAFE COURIER
>A courier service that helps users deliver parcels to different destinations and provides courier quotes based on weight categories.

## Tech Stack
* Node.js
* Express.js
* JSON web token (JWT)
* Bcrypt

## Main Files: Project Structure
 ```bash
        |-- index.js' ** the main driver of the app
            |-- controllers
            |   |-- authController.js
            |   |-- deliveryOrderController.js
            |--middleware
                |--authMiddleware.js
            |-- models
            |   |-- DeliveryOrder.js
            |   |-- user.js
            |-- routes
                |-- authRouter.js
                |-- deliveryOrderRouter.js
            |--.gitignore
``` 

## Environment Variables

* PORT -- `server port number`
* DB_URL -- `database URL`
* DB_URL_TEST -- `database URL for tests`

## Usage
1. `clone` this repository.
2. `cd` into project root directory.
3. run `npm install` to install all dependencies.
   (you must have [node](https://nodejs.org) installed)
4. Run `npm start` to start the server.
5. Open up `Postman` and then test out the Endpoints.


----


## User CRUD Operations

**SignUp User**
| Signs in a single user into the Application at a time.

| Endpoint      | Method            | Params       |Data type |
|:------------- |:-----------------:| :-----------:|---------:|
| `/auth/signup`  | POST        | `None`   |`String`    | 

* **Request Body**
    ```javascript
        {
            "email"    : "me@gmail.com",     
            "password"    : "mePassword"
        }
    ```  

 * **Request Headers**

  > None

* **Success Response:**

  **Status:** 201 OK <br />
     **Sample Content:**

   ```javascript
        {
            Message: "User account succesfully created!",
            token:"createToken(user._id)"
        }
    ```  
            
 
* **Error Response:**

  * **Status:** 400 BAD_REQUEST <br />
    **Content:** `{ "Error": "User Already Exists" }`


**Login User**
----
| Logs in a single user in the application at a time.    

| Endpoint      | Method            | Params       |Data type |
|:------------- |:-----------------:| :-----------:|---------:|
| `/auth/login`  | POST     | `None`   |`STRING`    | 
   

 * **Request Body**
    ```javascript
        {
            "email"    : "me@gmail.com",
            "password"    : "mePassword"
        }
    ```  
  

* **Request Headers**

  > None

* **Success Response:**

  **Status:** 200 OK <br />
     **Sample Content:**

   ```javascript
       {
          token:"createToken(user._id)"
        }
    ```  
            
 
* **Error Response:**

  * **Status:** 400 BAD REQUEST <br />
    **Content:** `{ error: 'Invalid password, retry with correct password!' }`
  

**Get All deliveryorder**
----
  Get All details of All deliveryoerder.

| Endpoint              | Method            | Params       |Data type |
|:--------------------- |:-----------------:| :-----------:|---------:|
| `/api/v1/parcels`  | GET               | `none`       |string    | 

* **Request Body**

  > None

* **Request Headers**

  > None

* **Success Response:**

  **Status:** 200 OK <br />
      **Sample Content:** '{'delivery order details'}
 
* **Error Response:**

  * **Status:** 404 NOT FOUND 
    **Content:** `{ 'error.message' }`



  **Get deliveryOrder By ID**
  ----
  Returns json data about deliveryorder details by id. 

| Endpoint                  | Method            | Params       |Data type |
|:--------------------------|:-----------------:| :-----------:|---------:|
| `/api/v1/parcels/:id`  | GET               | `required`   |string    | 

* **Request Body**

  > None

* **Request Headers**

  > None

* **Success Response:**

  **Status:** 200 OK 
      **Sample Content:** '{'deliveryorder details by id'}'
 
            
* **Error Response:**

  * **Status:** 404 NOT FOUND <br />
    **Content:** `{ 'error.message' }`


 **create DeliveryOrder**
----
 Create an order.

| Endpoint                  | Method            | Params       |Data type |
|:--------------------------|:-----------------:| :-----------:|---------:|
| `/api/v1/parcels`      | POST              | `none`       |string    | 

* **Request Headers**

  > None

* **Success Response:**

  **Status:** 200 OK 
      **Sample Content:** 
 
            
* **Error Response:**

  * **Status:** 404 NOT FOUND <br />
    **Content:** `{ 'error.message' }`


**Update DeliveryOrder**
----
 Update an order.

 | Endpoint                  | Method            | Params       |Data type |
|:--------------------------|:-----------------:| :-----------:|---------:|
| `/api/v1/parcels/:id`      | PATCH             | `required`   |string    | 

* **Request Headers**

  > Update what you need to update.

* **Success Response:**

  **Status:** 200 OK 
      **Sample Content:** 
 
            
* **Error Response:**

  * **Status:** 404 NOT FOUND <br />
    **Content:** `{ 'error.message' }`


**Delete DeliveryOrder**
----
  Delets an order from the Data Base.

| Endpoint                  | Method            | Params       |Data type |
|:------------------------- |:-----------------:| :-----------:|---------:|
| `/api/parcels/:id`  | DELETE            | `required`   |string    | 

*   **Request Body**
    
    > None

* **Request Headers**

  >None

* **Success Response:**

  **Status:** 200 OK <br />
      **Sample Content:**

    ```javascript
        {
             message: `Deliveryorder Successfully Cancelled`
        }
    ```  
            
 
* **Error Response:**

  * **Status:** 400 BAD REQUEST <br />
    **Content:** `{ 'error.message' }`

## API Tests
To test API with mocha,
```bash
run npm test
```
-----
<br/>

## Contributing
You can help improve the code base of the application where neccessary by raising an issue or opening a pull request.
