# Vote for Meeting (Doodle)
## Overview
### The Vote for Meeting project is a web application built with React that allows users to vote for preferred hours across a weekly calendar. It includes functionalities for voting, saving votes locally and on a server, and displaying the most voted date and hour.

## Technologies Used
### 1. Frontend: React, TypeScript, Formik (for forms), Yup (for form validation), CSS for styling.
### 2. Backend: Node.js (Express framework), JSON for data storage.

## Key Components
### 1. Calendar Component (Calendar.tsx):
- Displays a weekly calendar where users can vote for hours.
- Fetches the week's dates using getWeek() from ../configs/weekdays.
- Allows voting for hours using handleVote() and updates state using useState().
- Submits votes to saveMarkedHours() on button click.

### 2. DayVotes Component (DayVotes.tsx):
- Renders buttons for each hour of the day (Hours array).
- Indicates if an hour has been voted for (isVoted() function).
- Handles hour voting on button click (onClick() function).

### 3. Date Component (Date.tsx):
- Wraps the Calendar component to display it within a date picker layout.

### 4. Node.js Server (server.js):
- Uses Express for handling API requests.
- Provides a POST endpoint /api/saveVotes to save votes to a local JSON file (votes.json).

### 5. Utility Functions (../handleVotes/SaveVotes.ts)
- saveMarkedHours(votes: Record<number, Hour[]>): Saves marked votes to local storage (localStorage).
- getMostVotedFromLocalStorage(): Retrieves the most voted date and hour from localStorage.

## Data Handling
### LocalStorage: Used to store user votes locally (saveMarkedHours()).
### Server-side: Saves votes to votes.json using Express API (/api/saveVotes).

## Security
### Password Hashing: User passwords are hashed using SHA-256 before storage (createHmac() in login and register processes).
### Validation: Form inputs are validated using Yup schema validation in Formik forms (validationSchema).

# Getting Started
## 1. Setup:
### - Clone the repository.
### - Install dependencies using npm install.

## 2. Running the Application:
### - Start the frontend using npm start.
### - Start the backend server using node server.js.

## 3. Usage:
### - Access the application on http://localhost:3000 (frontend) and http://localhost:5000 (backend).

# Future Improvements
## User Authentication: Implement user authentication and authorization.
## Database Integration: Replace JSON file storage with a database for scalability.
## UI/UX Enhancements: Improve user interface and experience with animations and responsive design.

# Contributors
## Yoanna Yotova
## Mariya Lafchieva
## Velislava Zlatinova
## Yanko Yankov
