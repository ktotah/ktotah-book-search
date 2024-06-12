# Book Search App

![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Description
The Book Search App is a full-stack MERN application that allows users to search for books using the Google Books API, save their favorite books, and view them later. This application uses GraphQL with Apollo Server for the backend and Apollo Client on the frontend.

* **Motivation:** Developed to demonstrate proficiency in building a full-stack web application with user authentication and CRUD operations.
* **Purpose:** To provide a platform for users to search for and save books.
* **Problem It Solves:** Simplifies the process of searching for books and saving them for future reference.
* **What I Learned:** This project enhanced my skills in full-stack development, GraphQL, and Apollo Server/Client integration.

## Table of Contents

- [Project Background](#project-background)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Project Background
Initiated as a part of coursework for a Fullstack Coding Bootcamp, the Book Search App utilizes bootcamp-provided starter code to create a functional full-stack application.

## Features

- **User Authentication:** Secure signup and login functionality.
- **Book Search:** Search for books using the Google Books API.
- **Save Books:** Save favorite books to the user's account.
- **View Saved Books:** View and remove saved books.
- **Responsive Design:** Ensures a great experience on all devices.

## Technology Stack

- **Node.js:** For server-side runtime environment.
- **Express.js:** For server-side logic and API routes.
- **MongoDB:** For database management.
- **Mongoose:** For database schema and interactions.
- **React.js:** For building the user interface.
- **Apollo Client:** For state management and GraphQL queries/mutations.
- **GraphQL:** For querying and mutating data.
- **JWT:** For authentication.

## Installation 
To get started with the Book Search App:

1. Ensure Node.js and MongoDB are installed on your machine.
2. Clone the repository to your local machine: `git clone https://github.com/ktotah/ktotah-book-search.git`.
3. Navigate to the project directory in your terminal.
4. Install the necessary dependencies by running: `npm install`.
5. Create a `.env` file (based on the example file `.env.EXAMPLE` provided) in the root directory and add your environment variables: 
```bash
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```
6. Start your MongoDB server.
7. Start the server by navigating into the `server` folder and running: `npm start` - the server should begin running on PORT 3002.
8. Start the front-end of the application by navigating into the `client` folder and running: `npm start` - the application should start running on PORT 3001.

## Usage 
Launch the application by navigating to the front-end port `http://localhost:3001` in your web browser. Sign up for an account or log in to search for books, save your favorites, and view them later.

## Deployment
This application is deployed on Render. You can access it at the link [here](REPLACE_W_REAL_LINK).

<br>
Screenshot of the application:

![Screenshot of the Book Search App, showcasing the search results page after searching for "Harry Potter". The results display various Harry Potter book covers along with their titles, authors, descriptions, and options to view more details on Google Books or save the book.](./assets/book-search-app.png)

## Contributing

Your contributions are what make the community incredible. If you have an idea for improving this project, please fork the repository and create a pull request, or open an issue with your suggestions. For substantial changes, please open an issue first to discuss what you would like to change.

## License
![License](https://img.shields.io/badge/License-MIT-blue.svg)

This project is licensed under the [MIT License](./LICENSE).

## Questions
For any questions, please contact me with the information below.

* GitHub: [ktotah](https://github.com/ktotah)
* Email: [ket2137@columbia.edu](mailto:ket2137@columbia.edu)