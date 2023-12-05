const weatherController = {};

weatherController.getWeather = async (req, res, next) => {
const zipcode = req.query.zipcode;

try {
const apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=3d30ff413f95a9c053f02277e86046c8`;
const response = await fetch(apiURL)
.then((res) => res.json());

res.locals = response;
console.log('Weather data successfully retrieved!');
return next();
}

catch(err) {
    return next({
        log: 'An error occured in getWeather controller!!',
        status: 500,
        message: {err: 'An unknown server error occurred'}
    });
  }
}

module.exports = weatherController;
