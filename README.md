# TaskLens
Tasklens is a task assistant chatbot designed to streamline task management with the help of Gemini API. The project integrates a Nextjs front-end with an Express.js backend to provide a seamless and efficient user experience. Includes task visualization and management.

## Table of Contents

- [Authors](#authors)
- [Features](#features)
- [TechStack](#techstack)
- [Installation](#installation)
- [Contributions](#contributions)
- [Deployment Links](#deploymentlinks)

## Authors
- [@TanishaJauhari](https://github.com/Tanisboxed)
- [@R.K.Jyothish](https://github.com/JyothishRK)

## Features

### Chat Page: 
- AI driven chat powered by Gemini API
- Supports natural language task management queries.
- Quick task creation and updates via chatbot conversations.

### Task Dashboard
- Visual representation of tasks using Chart.js.
- Display current tasks categorized as:
  - Planned
  - ADHOC
  - On-going
- Interactive user interface for managing and visualizing tasks.


## TechStack
### Frontend
- **Next.js**
- **Tailwind CSS**

### Backend
- **Express.js**
- **Gemini API**
- **MongoDB**

### Libraries & Tools 
- **Axios**
- **Chart.js**
- **MongoDB**


## Installation 

### Prerequisites
- Node.js
- npm or yarn
- MongoDB instance

### Steps
#### Clone the Repository
```bash
git clone https://github.com/Tanisboxed/TaskLens.git
cd TaskLens
```
#### Install Dependencies 
``` bash
npm install
```
#### Example .env
``` env
MONGO_URI=your_mongodb_connection_string
PORT=your_desired_backend_port
NEXT_PUBLIC_API_URL=your_next_public_api_url
GEMINI_KEY=your_gemini_api_key
```

## Contributing 
1. Fork the repo.
2. Create a new branch for your feature
   ``` bash
   git checkout -b feature-name
   ```
3. Commit your changes
   ``` bash
   git commit -m "Description of your changes"
   ```
4. Push to your branch
   ``` bash
   git push origin feature-name
   ```
5. Open a pull request.


## Deployment Links

- [Front-end](https://task-lens-assistant.vercel.app)
- [Back-end](https://tasklens.onrender.com/tasks)





