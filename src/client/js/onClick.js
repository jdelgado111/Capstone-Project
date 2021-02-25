function handleClick(event) {
    console.log("Calling fetch");
    fetch("http://api.geonames.org/searchJSON?q=london&maxRows=1&username=jdelgado")
        .then(res => res.json())
        .then(json => {
            //console.log("Calling updateUI");
            //updateUI(json);
            console.log(json);
            console.log(json.geonames[0].countryName);
        });
}

export { handleClick }
