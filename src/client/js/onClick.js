async function handleClick(event) {
    const city = document.getElementById("city").value;
    
    const start = document.getElementById("start").value;
    const startDate = new Date(start);

    const end = document.getElementById("end").value;
    const endDate = new Date(end);

    //calculate days between dates
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    
    /* Geonames API */
    console.log("Calling Geonames API");

    const geoUrl = "http://api.geonames.org/searchJSON?q="+city+"&maxRows=1&username=";
    const geoKey = "jdelgado";

    const geoJson = await fetch(geoUrl+geoKey)
    .then(res => res.json());
    //console.log(geoJson);

    const geoData = geoJson.geonames[0];
    //console.log(geoData.countryName);

    const lat = geoData.lat;
    const lng = geoData.lng;
    const country = geoData.countryName;

    //TODO: check how near or far date is from today: <=7 days is near, >7 days is far

    /* Weatherbit API */
    console.log("Calling Weatherbit API");

    const weatherUrlNear = "http://api.weatherbit.io/v2.0/current?&lat="+lat+"&lon="+lng+"&key=";
    const weatherUrlFar = "https://api.weatherbit.io/v2.0/forecast/daily?&lat="+lat+"&lon="+lng+"&key=";
    const weatherKey = "394d151bb3f448218aab367dcc64e3b3";

    const weatherJson1 = await fetch(weatherUrlNear+weatherKey)
    .then(res => res.json());
    //console.log(weatherJson1);

    const weatherData1 = weatherJson1.data[0];
    //console.log(weatherData1.temp);
    const temp = weatherData1.temp;
    const desc = weatherData1.weather.description;

    const weatherJson2 = await fetch(weatherUrlFar+weatherKey)
    .then(res => res.json());
    //console.log(weatherJson2);

    const weatherData2 = weatherJson2.data[0];
    //console.log(weatherData2.temp);
    const day = weatherData1.valid_date;

    /* Pixabay API */
    console.log("Calling Pixabay API");

    const pixKey = "20428715-b760a9bb313f215d3de7b519e";
    const pixUrl = "https://pixabay.com/api/?key="+pixKey+"&q="+country+"&image_type=photo&category=places&safesearch=true";

    //console.log(pixUrl);

    const pixJson = await fetch(pixUrl)
    .then(res => res.json());
    //console.log(pixJson);
    
    const pixImage = pixJson.hits[0];

    const imageUrl = pixImage.webformatURL;
    const width = pixImage.webformatWidth;
    const height = pixImage.webformatHeight;
    //console.log(imageUrl);

    updateUI(city, country, daysDifference, temp, desc, imageUrl, width, height);
}

function updateUI(city, country, daysDifference, temp, desc, imageUrl, width, height) {
    //destination (city, country)
    const destination = document.getElementById("dest");
    destination.innerHTML =  "Departing to: " + city + ", " + country;

    //length of trip
    const days = document.getElementById("days");
    days.innerHTML = "Length of trip: " + daysDifference + " days";

    //temp
    const temperature = document.getElementById("temp");
    temperature.innerHTML = temp + "&deg;C";

    //weather description
    const description = document.getElementById("desc");
    description.innerHTML = desc;

    //set image
    const image = document.getElementById("image");
    image.src = imageUrl;
    image.width = width;
    image.height = height;

    //remove hidden class
    document.getElementById("bottom").classList.remove("hidden");
}

export { handleClick, updateUI }
