# ⛅ LiWeatherApp

LiWeatherApp is a simple weather application that provides real-time and 14-days weather information by given location.

Click to go to website [LiWeatherApp](https://liweather.vercel.app)

![1724835599101](image/README/1724835599101.png)

## Features

- Retrieve current and 14-days weather data including temperature, wind speed, humidity, and more.
- User-friendly interface with graphical representation of weather conditions.
- Supports searching for weather information based on city names.

## Technologies Used

- Node.js
- Express.js
- Axios
- HTML, CSS, Bootstrap, JavaScript
- React.js
- Open-Meteo API
- Docker

## Getting Started

### Prerequisites

- Node.js installed on your machine
- Docker (optional)

### Installation

Clone the repository:

```bash
   git clone https://github.com/erenxcolakx/LiWeatherApp.git
```

Install dependencies:

```bash
  cd server
  npm install
  cd client
  npm install
```

Start the application:

```bash
cd server
npx nodemon server.js
```

```bash
cd client 
npm run build
npm start
```

### Docker

Build and run the Docker containers for both the frontend and backend.

```bash
docker-compose up --build
```



---



The application will be accessible at http://localhost:3000.

Usage
Open your web browser and navigate to http://localhost:3000.
Enter the city name in the search bar and click the city you want.
View the real-time weather information for the specified location.
Contributing
If you'd like to contribute to LiWeatherApp, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and submit a pull request.
