# Title: Tick-it

## Description <br/> 
A web app that allows Thinkful TA's to help students that need help with some coding project and to keep track of students who assigned themselves onto a queue. The reason why this app was created is because we noticed that when there are a lot of students asking for help on our slack channel, it is hard to keep track of who is next on the queue in which they ask for help.

## Technology Used <br/>
**FrontEnd**: HTML, CSS, Javascript, React<br/>
**BackEnd**: NodeJS, Express, MongoDB, Mongoose, Mlab<br/>
**Deployment**: Heroku, Travis <br/> 

## Documentation of API <br/>
**GET** https://tick-it-jk.herokuapp.com/api/tickets <br/>
  * This allows you to get all the tickets in the database <br/>
  * This is used to display all the tickets in the frontend persistently</br>
**POST** https://tick-it-jk.herokuapp.com/api/tickets <br/>
  * This allows you to post a ticket into the database <br/>
  * This is used to allow student users (doesn't need to log in) to submit a ticket
**PUT** https://tick-it-jk.herokuapp.com/api/tickets/:id/status <br/>
  * This allows TA users that are logged in to update a ticket in the database <br/>
  * This is used to allow TA users to update the status of a ticket <br/>
**DELETE** https://tick-it-jk.herokuapp.com/api/tickets/:id <br/>
  * This allows you to delete a ticket from the database <br/>
  * This is used to allow student users to delete the ticket if they don't need help <br/>
  * This is used to allow TA users to delete the ticket once they are finish with it <br/>
**GET** https://tick-it-jk.herokuapp.com/api/users/:username <br/>
  * This allows TA users that are logged in to get their username and fullName from the database <br/>
  * This is used to allow us to store the username and fullname into a localStorage once the TA logs in. <br/>
**POST** https://tick-it-jk.herokuapp.com/api/users <br/>
  * This allows you to add a user into the database <br/>
  * This is used to allow people to sign up as a TA user <br/>

### API still needs to be used in Frontend <br/>
**PUT** https://tick-it-jk.herokuapp.com/api/tickets/:id <br/>
  * This allows you to update a ticket's fields beside status into the database <br/>
  * This allows student users to edit their request description, group name, or location

## How To Use our code <br/>
* Fork it to your Repo
* Git clone the Repo link
* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Run `npm install` in the terminal => get all the dependencies install
* Make sure MongoDB is installed
* Run `Mongod` in the terminal => to get the mongodb server running
* Run `npm run dev` in the terminal => to get client server and backend server running
* Run the development task: `npm run dev`
    * Starts a server running at http://localhost:8080
    * Automatically rebuilds when any of your files change

## Installing dependencies

Client-side dependencies should be installed into the `client` directory:

```
cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME/client
npm install --save dependency-name
```

Server-side dependencies should be installed into the `server` directory:

```
cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME/server
npm install --save dependency-name
```

## Screenshots <br/>
#### Home Screen <br/>
When you go to our website, you will go to our Ticket Submission Page <br/>
![TicketSubmission](README_images/submitTicket.png "Ticket Submission") <br/>

#### Ticket list <br/>
When you submit a ticket (no blank values), you will go to our Ticket List Page. Clicking on submit new request or Tick-it will lead you back to the Home Screen <br/>
![TicketList](README_images/requestForm.png "Ticket List") <br/>

#### Login <br/>
When you click TA Login Or Signup in the Home Screen, you will go to the Login Page <br/>
![Login](README_images/login.png "Login") <br/>

#### Sign Up <br/>
When you click on the sign up on the login page, you will go to the sign up page <br/>
![SignUp](README_images/signup.png "Sign Up") <br/>

#### TA Screen <br/>
When you log in from the login page, you will go to the TA screen. When you go to any other page while you are logged in, you will be redirected to the TA screen. When you click logout, you will go back to the login screen. <br/>
![TAView](README_images/TAscreen.png "TA Screen") <br/>

