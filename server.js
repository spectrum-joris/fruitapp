// first install express and mysql: npm install express mysql2

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const fs = require('fs');

/*
const express = require('express');: Haalt de express-module op, een framework dat wordt gebruikt om de Node.js-server te bouwen.
const mysql = require('mysql2');: Importeert de mysql2-module, die wordt gebruikt om met een MySQL-database te communiceren.
const app = express();: Initialiseert de Express-applicatie.
const port = 3000;: Definieert de poort waarop de server luistert.
const fs = require('fs');: Importeert de fs-module om bestanden te lezen, in dit geval het SQL-bestand.
*/

// Create a connection to the database
const connection = mysql.createConnection({
    host: "buys6kr6vhxzkd1eyzlw-mysql.services.clever-cloud.com",
    user: "udewyroo3ui0zwca",
    database: "buys6kr6vhxzkd1eyzlw",
    password: "Q7f0I2r2XvSl3cTZdtMI"
});

// Middleware for serving static files
app.use(express.static('public')); //Dit geeft de Express-app toegang tot de bestanden in de map public (zoals je HTML, CSS en client-side JavaScript-bestanden).

// API route to get fruit price by name
app.get('/api/fruit', (req, res) => {
    const fruitName = req.query.name;
    
    console.log(`Requested fruit: ${fruitName}`); // Log wat er wordt opgevraagd
  
    if (!fruitName) {
      console.error('No fruit name provided!');
      return res.status(400).json({ error: 'Fruit name is required' });
    }

    // Controleer of het SQL-bestand correct wordt gelezen
    const query = fs.readFileSync('./queries/getFruitPrice.sql', 'utf-8');
    console.log('SQL Query:', query); // Log de query

    // Voer de query uit met fruitName als parameter
    connection.query(query, [fruitName], (error, results) => {
        // Voert de SQL-query uit met fruitName als parameter. Als de query slaagt en resultaten oplevert, worden de gegevens van het fruit teruggestuurd naar de client. Als de query mislukt of geen resultaten oplevert, wordt een foutmelding teruggestuurd.
      if (error) {
        console.error('Error executing query:', error); // Meer gedetailleerde foutmelding loggen
        return res.status(500).json({ error: 'Database query error', details: error.message });
      }
  
      if (results.length > 0) {
        console.log('Fruit found:', results[0]); // Log het resultaat van de query
        res.json(results[0]);
      } else {
        console.log('No fruit data found');
        res.status(404).json({ error: 'Fruit not found' });
      }
    });
});

  

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});