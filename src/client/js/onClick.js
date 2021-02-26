async function handleClick(event) {
    const city = document.getElementById("city").value;

    const geoUrl = "http://api.geonames.org/searchJSON?q="+city+"&maxRows=1&username=";
    const geoKey = "jdelgado";

    console.log("Calling Geonames API");

    const geoJson = await fetch(geoUrl+geoKey)
    .then(res => res.json());
    console.log(geoJson);

    const geoData = geoJson.geonames[0];
    console.log(geoData.countryName);

    const lat = geoData.lat;
    const lng = geoData.lng;

    //TODO: check how near or far date is from today: <=7 days is near, >7 days is far

    const weatherUrlNear = "http://api.weatherbit.io/v2.0/current?&lat="+lat+"&lon="+lng+"&key=";
    const weatherUrlFar = "https://api.weatherbit.io/v2.0/forecast/daily?&lat="+lat+"&lon="+lng+"&key=";
    const weatherKey = "394d151bb3f448218aab367dcc64e3b3";
    
    console.log("Calling Weatherbit API");

    const weatherJson1 = await fetch(weatherUrlNear+weatherKey)
    .then(res => res.json());
    console.log(weatherJson1);

    const weatherData1 = weatherJson1.data[0];
    console.log(weatherData1.temp);

    const weatherJson2 = await fetch(weatherUrlFar+weatherKey)
    .then(res => res.json());
    console.log(weatherJson2);

    const weatherData2 = weatherJson2.data[0];
    console.log(weatherData2.temp);

    //console.log("Calling Pixabay API");
}

export { handleClick }
