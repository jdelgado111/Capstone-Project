async function handleClick(event) {
    const today = new Date();

    const city = document.getElementById("city").value;
    
    const start = document.getElementById("start").value;
    const startDate = new Date(start);

    const end = document.getElementById("end").value;
    const endDate = new Date(end);

    //calculate days between start and end dates
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    //console.log("Length of trip: " + daysDifference);

    //calculate days between today and start date
    const time = startDate.getTime() - today.getTime();
    const days = time / (1000 * 3600 * 24);
    //console.log("Days between today and start date: " + days);
    

    /*** Geonames API ***/
    console.log("Calling Geonames API");

    const geoJson = await fetch(`/geo/${city}`)
    .then(res => res.json());
    //console.log(geoJson);

    const geoData = geoJson.geonames[0];

    const lat = geoData.lat;
    const lng = geoData.lng;
    const country = geoData.countryName;
    //console.log(geoData.countryName);


    /*** Weatherbit API ***/
    console.log("Calling Weatherbit API");

    //check how near or far start date is from today: <=7 days is near, >7 days is far
    let weatherJson;
    let day;
    let weatherData;

    if (days <= 7) {
        weatherJson = await fetch(`/weather/near/${lat}/${lng}`)
        .then(res => res.json());
        //console.log(weatherJson1);

        weatherData = weatherJson.data[0];
        day = today;
    }
    else {
        weatherJson = await fetch(`/weather/far/${lat}/${lng}`)
        .then(res => res.json());
        //console.log(weatherJson);

        //get weather for the date the trip starts if less than 16 days away
        let weatherDay = weatherJson.data[0];
        day = today;

        if (days<16) {
            weatherData = weatherJson.data[Math.round(days)+1];
            weatherDay = weatherData.valid_date;
            day = new Date(weatherDay);
        }
        
        console.log("Date from API: " + day);
    }
    //console.log(weatherData.temp);
    const temp = weatherData.temp;
    const desc = weatherData.weather.description;


    /*** Pixabay API ***/
    console.log("Calling Pixabay API");

    const pixJson = await fetch(`/pix/${country}`)
    .then(res => res.json());
    //console.log(pixJson);
    
    const pixImage = pixJson.hits[0];

    const imageUrl = pixImage.webformatURL;
    const width = pixImage.webformatWidth;
    const height = pixImage.webformatHeight;
    //console.log(imageUrl);

    updateUI(city, country, daysDifference, endDate, day, temp, desc, imageUrl, width, height);
}

function updateUI(city, country, daysDifference, endDate, day, temp, desc, imageUrl, width, height) {
    //destination (city, country)
    const destination = document.getElementById("dest");
    destination.innerHTML =  "Departing to: " + city + ", " + country;

    //length of trip
    const days = document.getElementById("days");
    days.innerHTML = "Length of trip: " + daysDifference + " days";

    //end date
    const end = document.getElementById("ending");
    end.innerHTML = "Ending on: " + (endDate.getMonth()+1) + "/" + (endDate.getDate()+1) + "/" + endDate.getFullYear();

    //date
    const date = document.getElementById("date");
    date.innerHTML = (day.getMonth()+1) + "/" + day.getDate();

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

    //remove hidden class to display results
    document.getElementById("bottom").classList.remove("hidden");
}

export { handleClick, updateUI }
