async function handleClick(event) {
    const city = document.getElementById("city").value;

    const geoUrl = "http://api.geonames.org/searchJSON?q="+city+"&maxRows=1&username=";
    const geoKey = "jdelgado";

    const weatherUrl = "";
    const weatherKey = "394d151bb3f448218aab367dcc64e3b3";

    console.log("Calling Geonames API");

    const json = await fetch(geoUrl+geoKey)
    .then(res => res.json());
    console.log(json);
    console.log(json.geonames[0].countryName);


    //console.log("Calling Weatherbit API");

}

export { handleClick }
