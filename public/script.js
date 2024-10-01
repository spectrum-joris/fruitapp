// select elements from the DOM
const fruitDropDown = document.getElementById("fruitDropDown");
const fruitInfo = document.getElementById("fruitInfo");

// add event listener for fruit selection
fruitDropDown.addEventListener("change", function () {
    const selectedFruit = fruitDropDown.value;
    console.log(`Je hebt ${selectedFruit} geselecteerd`);

// Check if the user selected the default "select" option
if (selectedFruit === "") {
    fruitInfo.innerHTML = "Selecteer een fruit om informatie te zien.";
    fruitInfo.classList.remove("fruit-app__info--success", "fruit-app__info--error");
    return;  // Exit the function to prevent fetch from running
}

console.log(`Je hebt ${selectedFruit} geselecteerd`);

// Fetch data from the server
const url = `http://localhost:3000/api/fruit?name=${encodeURIComponent(selectedFruit)}`;
console.log(`fetching data from: ${url}`);

fetch(url)
        .then(response => response.json())
        .then(data => {
            // Update innerHTML to include the fruit emoji and price
            fruitInfo.innerHTML = `${data.image} ${data.name} kosten ${data.price} euro per kilo`;
            fruitInfo.classList.remove("fruit-app__info--error");
            fruitInfo.classList.add("fruit-app__info--success");
        })
        .catch(err => {
            fruitInfo.innerHTML = `Sorry, we hebben geen informatie gevonden over ${selectedFruit}`;
            fruitInfo.classList.remove("fruit-app__info--success");
            fruitInfo.classList.add("fruit-app__info--error");
        });
});

/* 
fetch(url): Maakt een asynchrone HTTP GET-aanroep naar de gegenereerde URL (naar de backend).
.then(response => response.json()): Zodra de server een response geeft, zet het de response om naar JSON-formaat.
.then(data => {...}): Wanneer de data beschikbaar is, wordt de informatie van de geselecteerde vrucht (data.name en data.price) weergegeven in het fruitInfo-element.
.catch(err => {...}): Als er iets misgaat (bijvoorbeeld een fout bij het ophalen van de data), wordt er een foutmelding in het DOM weergegeven. 
*/