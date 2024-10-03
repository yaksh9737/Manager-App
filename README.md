# Task Manager

## Overview

This project is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yaksh9737/Manager-App.git

   ```

2. **Install dependencies:**

   Navigate to client directory and install frontend dependencies using yarn

   ```
   yarn install
   ```

   Similary navigate to api folder and install backend dependencies

   ```
   yarn install
   ```

3. **ENV variables:**

   - create .env file in the Backend folder and add these variables

     #### PORT= 

     #### DB_URL= your db url

     #### JWT_SECRET= your secret (string)


4. **Run project:**
   - Open terminal, navigate to frontend directory and run below command to start frontend
   ```
       yarn run dev
   ```
   - Open another terminal, navigate to Backend directory and run this command to start backend server
   ```
       yarn start

 **Responsive Design:** The application is designed to be responsive and work seamlessly across different devices.

## Technologies Used

- **MongoDB:** NoSQL database for storing user data, listings.
- **Express.js:** Web application framework for building the backend server.
- **React.js:** JavaScript library for building the user interface.
- **Node.js:** JavaScript runtime environment for executing server-side code.
- **JWT:** JSON Web Tokens for secure user authentication.
