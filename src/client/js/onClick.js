async function handleClick(event) {
    const city = document.getElementById("city").value;

    console.log("Calling Geonames API");
    const json = await fetch("http://api.geonames.org/searchJSON?q="+city+"&maxRows=1&username=jdelgado")
    .then(res => res.json());

    console.log(json);
    console.log(json.geonames[0].countryName);

    //console.log("Calling Weatherbit API");

}

export { handleClick }
