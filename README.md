# WatIEat

A web app that automatically tracks your calories and macros based off photos of your meals.

[Try it out!](http://watieat.herokuapp.com/login)
[Link to demo video (2 min).](https://youtu.be/Dr-VhFkSSUw)

## Installation

1. Install required dependencies:

   ```bash
   npm run install
   ```

2. Run the queries in `queries.sql` to generate required PostgreSQL tables.
3. Create a `.env` file in the root folder with the following variables:

   ```
   DB_HOST=localhost
   DB_USER=[YOUR_POSTGRES_USERNAME]
   DB_PASS=[YOUR_POSTGRES_PASSWORD]
   DB_DATABASE=[YOUR_POSTGRES_DB_NAME]
   JWT_SECRET=[YOUR_JWT_SECRET_KEY]
   JWT_EXPIRES=[YOUR_JWT_EXPIRATION_TIME]
   NUTRITIONIX_APP_ID=[YOUR_NUTRITIONIX_APP_ID]
   NUTRITIONIX_APP_KEY=[YOUR_NUTRITIONIX_APP_KEY]
   ```

4. Run the app on http://localhost:4001:

   ```bash
   npm run dev
   ```
