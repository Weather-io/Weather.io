const express = require ('express');
const path = require ('path');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

//need a route for fetching data from openweathermap



app.all('*', (req, res) => {
  res.status(404).send('The page you\'re looking for doesn\'t exist!');
});

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

