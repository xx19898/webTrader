# webTrader
## Description
App which emulates a stock trading platform. It allows user to view different stocks, price fluctuation and history up to five years back. It also simulates user buying stocks and admin(broker) has to then accept or negate the deal. App also has inbuilt chat for communication between users and admins
## Technologies used

## How to start
In order to see how it works you gotta:
1. Download both front end back -end folders
2. Build projects on both frontend and backend by executing npm install on frontend and gradle build on the backend
2. Create a MySQL database on your machine, connect the forementioned db to the Spring backend by writing in your db info into application.properties file in src/main/resources.
3. Run the backend in order to create the schema.
4. Manually create a user with admin role.
5. Register as a normal user and use the app


> [!WARNING]
> alphavantageApi changed their api so that many of the free endpoints are now closed behind the paywall :/
it kinda breaks some functionality as for example viewing certain data in the stock viewer component
