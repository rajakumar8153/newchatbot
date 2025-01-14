
**CDP Support Agent Chatbot**

A support chatbot designed to answer "how-to" questions related to four Customer Data Platforms (CDPs): Segment, mParticle, Lytics, and Zeotap. The chatbot extracts relevant information from the official documentation of these CDPs to guide users in performing specific tasks or achieving desired outcomes.

**Table of Contents**
Features
Tech Stack
Installation
Usage
File Structure
Enhancements
Contributors
License


**Features**
Answer "How-to" Questions
The chatbot provides step-by-step guidance on tasks related to Segment, mParticle, Lytics, and Zeotap.
Example:

"How do I set up a new source in Segment?"
"How do I build an audience segment in Lytics?"
Dynamic Documentation Fetching
Retrieves and processes content directly from the official documentation for accurate responses.

Cross-CDP Comparisons (Bonus Feature)
Compares functionalities or approaches between platforms.
Example:

"How does Segment's audience creation process compare to Lytics'?"
Advanced Query Handling
Handles complex questions using indexing and Natural Language Processing (NLP).

Frontend Integration
User-friendly React-based interface for submitting queries and displaying results.

**Tech Stack**
Frontend: React, Axios
Backend: Node.js, Express.js
Database: MongoDB
Additional Libraries:
Lunr.js: For indexing documentation and efficient search.
dotenv: To manage environment variables.
CORS: For handling cross-origin requests.


**Installation**


1. Clone the Repository
bash
Copy code
git clone https://github.com/your-repo/chatbot-cdp.git
cd chatbot-cdp
2. Install Dependencies
Backend
bash
Copy code
cd server
npm install
Frontend
bash
Copy code
cd client
npm install
3. Set Up Environment Variables
Create a .env file in the server directory with the following:

env
Copy code
PORT=5000
OPENAI_API_KEY=your_openai_api_key
4. Start the Application
Backend
bash
Copy code
cd server
npm run dev
Frontend
bash
Copy code
cd client
npm start
The app will be available at http://localhost:3000.

Usage
Open the chatbot interface in your browser.
Select a platform (Segment, mParticle, Lytics, or Zeotap).
Enter your "how-to" question and submit.
View the response fetched from the corresponding platform's documentation.


**File Structure**
bash
Copy code
chatbot-cdp/
├── server/
│   ├── controllers/
│   │   └── chatbotController.js  # Backend logic for handling queries

│   ├── routes/
│   │   └── chatbotRoutes.js      # API routes

│   ├── server.js                 # Express server setup
│   └── .env                      # Environment variables


├── client/
│   ├── src/
│   │   ├── components/

│   │   │   └── Chatbot.jsx       # React component for chatbot UI
│   │   └── App.js                # Main React application

│   ├── public/
│   └── package.json              # React app configuration


├── README.md                     # Project documentation
└── package.json                  # Backend configuration


**Enhancements**

Planned Features:
Automated Documentation Scraping: Regularly update documentation indices.
Enhanced NLP Integration: Use advanced models (e.g., OpenAI GPT-4) for better query understanding.
User Authentication: Allow users to save their queries and responses.
Deployment: Host on cloud platforms (e.g., Heroku, Netlify).


Contributors
RAJAKUMAR S(Developer)
Email: 727822tuec144@skct.edu.in


