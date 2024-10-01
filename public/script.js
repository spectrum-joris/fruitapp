// select elements from the DOM
const fruitDropDown = document.getElementById("fruitDropDown");
const fruitInfo = document.getElementById("fruitInfo");

// Fetch fruit list from the server and populate the dropdown
const fetchFruits = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/fruits');
        const fruits = await response.json();
        
        // Dynamically populate dropdown
        fruits.forEach(fruit => {
            const option = document.createElement('option');
            option.value = fruit.name;
            option.textContent = fruit.name;
            fruitDropDown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching fruits:', error);
    }
};

// Event listener for fruit selection
fruitDropDown.addEventListener("change", async () => {
    const selectedFruit = fruitDropDown.value;

    if (!selectedFruit) {
        fruitInfo.innerHTML = "Selecteer een fruit om informatie te zien.";
        fruitInfo.classList.remove("fruit-app__info--success", "fruit-app__info--error");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/fruit?name=${encodeURIComponent(selectedFruit)}`);
        const data = await response.json();

        fruitInfo.innerHTML = `${data.image} ${data.name} kosten ${data.price} euro per kilo`;
        fruitInfo.classList.remove("fruit-app__info--error");
        fruitInfo.classList.add("fruit-app__info--success");
    } catch (error) {
        fruitInfo.innerHTML = `Sorry, we hebben geen informatie gevonden over ${selectedFruit}`;
        fruitInfo.classList.remove("fruit-app__info--success");
        fruitInfo.classList.add("fruit-app__info--error");
    }
});

// Call the function to fetch fruits when the page loads
fetchFruits();
