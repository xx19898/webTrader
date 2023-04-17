# webTrader
App which emulates a stock trading platform.
In order to see how it works you gotta:
1. Download both front end back -end folders
2. Build projects on both frontend and backend by executing npm install on frontend and gradle build on the backend
2. Create a MySQL database on your machine, connect the forementioned db to the Spring backend by writing in your db info into application.properties file in src/main/resources.
3. Run the backend in order to create the schema.
4. Manually create a user with admin role.
5. Register as a normal user and use the app

***CAUTION***
alphavantageApi changed their api so that many of the free endpoints are now closed behind the paywall :/
it kinda breaks some functionality as for example viewing certain data in the stock viewer component
