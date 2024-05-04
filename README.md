
# Buckito

## Introduction
Buckito is a cutting-edge movie recommendation website designed to offer personalized movie suggestions. Utilizing a robust combination of the MERN stack and FastAPI microservices, Buckito taps into a database of over 10,000 movies from TMDB to deliver real-time, user-specific movie recommendations through collaborative and content-based filtering.

## Features
- **Extensive Movie Database:** Access to over 10,000 movies from the TMDB database for varied and extensive recommendations.
- **Advanced Recommendation Algorithms:** Utilizes both collaborative filtering and content-based methods to predict movies that users will love.
- **Realtime Predictions:** Leverage the speed of FastAPI to provide real-time movie predictions.
- **Optimized Backend:** GraphQL implementation ensures fast backend performance with minimal network data flow.
- **Continuous Integration and Deployment:** Integrated CI/CD pipeline using Heroku, streamlined from Git repository.

## Technologies
- **Frontend:** React (part of the MERN stack)
- **Backend:** Node.js with Express (part of the MERN stack), FastAPI for microservices
- **Database:** MongoDB (part of the MERN stack)
- **API:** GraphQL
- **CI/CD:** Heroku
- **Data Source:** TMDB

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Python with FastAPI

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/buckito.git
   cd buckito
   ```

2. Install NPM packages for the frontend and backend:
   ```
   npm install
   ```

3. Set up your Python environment for FastAPI and install dependencies:
   ```
   pip install fastapi uvicorn
   ```

4. Enter your environment variables in `.env`:
   ```
   MONGO_URI="your_mongodb_uri"
   TMDB_API_KEY="your_tmdb_api_key"
   ```

5. Start the backend and frontend servers:
   ```
   npm start # For MERN backend and React frontend
   uvicorn main:app --reload  # For FastAPI service
   ```

6. Navigate to `localhost:3000` in your browser for the frontend.

## Usage
Explore the website to get personalized movie recommendations. The more you interact, the better the predictions get, thanks to our sophisticated recommendation algorithms.

## Contributing
We welcome contributions to make Buckito even better. Follow these steps to contribute:

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License
Distributed under the MIT License. See \`LICENSE\` for more information.

## Contact
Project Link: [https://www.buckito.hashigma.com](https://www.buckito.hashigma.com)
