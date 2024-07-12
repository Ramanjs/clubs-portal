# Clubs Portal Frontend

Welcome to the Clubs Portal Frontend project! This is the frontend repository for a web application designed to manage various clubs and events.

## Installation

To get started with this project, follow these steps:

1. Clone this repository to your local machine using Git:
```bash
git clone https://github.com/Ramanjs/clubs-portal-frontend.git
```

2. Navigate into the project directory:
```bash
cd clubs-portal-frontend
```

Install dependencies using npm (Node.js is required):
```bash
npm install
```

## Setup
Before running the application, make sure you have the backend server up and running. You can find the backend repository [here](https://github.com/Ramanjs/clubs-portal).

Once the backend is set up, follow these steps:

1. Create a .env file in the root directory of the project.

2. Add the following environment variables to the .env file:

```bash
REACT_APP_API_URL=http://localhost:8080/
```
Replace http://localhost:8080/ with the base URL of your backend API in case you decide to change it.

## Usage
To start the development server, run:

```bash
npm start
```
This will start the frontend application in development mode. Open http://localhost:3000 to view it in your browser.

## Building for Production
To build the project for production, run:

```bash
npm run build
```
This will create a build directory with optimized production-ready files.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## Acknowledgments
Main contributers for this project are [Ramanjs](https://github.com/ramanjs) and [AdityaGirdhar](https://github.com/AdityaGirdhar) . Special thanks to the Computer Science and Engineering Department, IIIT Delhi for their valuable contributions and support.

## Directory Structure
```
clubs-portal-frontend
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── components
│   │   ├── EventForm.jsx
│   │   ├── Navbar.jsx
│   │   └── RequireAuth.jsx
│   ├── features
│   │   └── user
│   │       └── user.js
│   ├── index.js
│   ├── pages
│   │   ├── Club.jsx
│   │   ├── Clubs.jsx
│   │   ├── Event.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── LoginSuccess.jsx
│   │   └── Profile.jsx
│   ├── store
│   │   └── store.js
│   ├── styles
│   │   └── index.css
│   └── utils
│       └── baseUrl.js
└── tailwind.config.js

10 directories, 23 files
```
