# Install Instructions

If you have any issues setting up the local environment, feel free to contact me. I am willing to give an online demo / submit a video demonstration if needed.

### Frontend

* Enter frontend directory: `cd frontend`
* Remove the node_modules folder if it exists: `rm -rf node_modules`
* Install the node_modules: `npm install`
* Start the frontend server: `npm start`

### Backend

* Enter backend directory: `cd backend`
* Start the backend server: `python3 server.py`
* Missing Dependencies?
 - Flask: `pip3 install flask`
 - Flask_cors: `pip3 install flask_cors`
 - MySQL connector: `pip3 install mysql.connector`
* NOTE: If the MAMP database connection credentals are not the default (u: root; p: root), then you will need to update the credentals in `server.py`

### Database / MAMP

* Create a database called `portfolio_project_db`
* Import the database into MAMP
* Ensure the MAMP server is started

# Testing

### User With Portfolio

* Email: andres@test.com Password: test
* Note: View / Edit Portfolio, View Others Portfolio, View Portfolio Visits, Portfolio Visits are Logged

### User Without Portfolio

* Email: kmarx@test.com Password: test
* Note: Create Portfolio, View Others Portfolio, Portfolio Visits are Logged

### Non Registered User

* navigate to `localhost:3000/portfolios`
* Note: Login, View Other Portfolios, and Guest Visits are not logged

### Edit Portfolio

* Must be signed in to edit a users portfolio
* If a user tries to access a separate user's edit portfolio page, they are redirected to the login page

### View Logs

* When a registered user visits a different user's portfolio, that view is logged.
* Portfolio view logs do not duplicate if the user is on the page for less than 5 minutes. 
* Currently a bug that sends two create view requests to the server. Frontend deals with this issue as I could not find a solution for this.