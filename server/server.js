const express = require ('express');
const path = require ('path');
const app = express();
const PORT = 8080;
const weatherController = require('./controllers/weatherController');

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// API route for fetching weather data from openweathermap
app.get('/forecast', weatherController.getWeather, (req, res) => {
  res.status(200).json(res.locals.getWeather);
});


//catch-all for unknown paths
app.all('*', (req, res) => {
  res.status(404).send('The page you\'re looking for doesn\'t exist!');
});

//global error handler
app.use((err, req, res, next) => {
 const defaultErrObj = {
  log: 'An error occured within the backend!!',
  status: 500,
  message: {err: 'An unknown server error occurred'}
 }
 const errorObj = Object.assign(defaultErrObj, err);

 console.log(`Backend error: ${errorObj.message}`);
 return res.status(errorObj.status).json(errorObj.message)
});



app.listen (PORT, () => console.log(`listening on PORT: ${PORT}`));

