# React Weather App

This project consists of a backend and frontend application designed to display weather information for several cities using data from the OpenWeather API. Below are the details and instructions to run each part of the project.

---

## Backend (Node.js)

- **Folder:** `weather-api`
- **To Run:** Execute `node src/app.js` in the terminal.

### Features:
- **Caching:** The backend caches responses from the OpenWeather API for 30 minutes. This caching mechanism ensures that subsequent requests from the frontend within this timeframe fetch data from the cache, providing faster response times and reducing the number of API calls.

---

## Frontend (React.js)

- **Folder:** `weather-frontend`
- **To Run:** Execute `npm start` in the terminal.

### Features:
- **Weather Display:** The frontend presents a weather dashboard showing widgets for each of the following cities: Lisboa, Leiria, Coimbra, Porto, Faro.
- **Temperature Units:** Users can view temperature values in Kelvin, Celsius, and Fahrenheit.
- **Automatic Updates:** Weather information updates every 30 minutes to ensure data freshness.

---

## Usage Instructions

1. **Backend Setup:**
   - Navigate to the `weather-api` directory.
   - Install dependencies if needed (`npm install`).
   - Start the server with `node src/app.js`.

2. **Frontend Setup:**
   - Navigate to the `weather-frontend` directory.
   - Install dependencies if needed (`npm install`).
   - Launch the application with `npm start`.

3. **Accessing the Application:**
   - Once both backend and frontend are running, access the weather dashboard in your web browser at `http://localhost:3000` (assuming default React.js setup).

## Notes:
- Ensure Node.js and npm (Node Package Manager) are installed on your system to run both the backend and frontend applications.
- The backend caches weather data from the OpenWeather API for 30 minutes to optimize performance and reduce API calls.
- The frontend displays weather widgets for Lisboa, Leiria, Coimbra, Porto, and Faro, allowing users to switch between Kelvin, Celsius, and Fahrenheit temperature units.
