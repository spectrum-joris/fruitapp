import express from 'express';
import mysql from 'mysql2/promise'; // Use promise-based mysql2
import { promises as fs } from 'fs'; // Use fs promises to read files
import path from 'path';

const app = express();
const port = 3000;

// Use __dirname safely in ES6
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a connection to the database using async/await
const connectionConfig = {
    host: "localhost",  // Assuming you're using a local database
    user: "root",
    database: "SPECTRUM",
    password: ""
};

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to get all fruits for dropdown
app.get('/api/fruits', async (req, res) => {
    try {
        // Log the start of the query
        console.log('Fetching all fruits...');

        const query = await fs.readFile('./queries/getAllFruits.sql', 'utf-8');
        const connection = await mysql.createConnection(connectionConfig);

        // Execute query to get all fruits
        const [results] = await connection.query(query);
        await connection.end();

        if (results.length > 0) {
            // Return all fruits as JSON
            console.log('Fruits fetched successfully:', results);
            res.json(results);
        } else {
            console.log('No fruits found');
            res.status(404).json({ error: 'No fruits found' });
        }
    } catch (error) {
        // Log the error stack for debugging
        console.error('Error fetching fruits:', error.stack || error);
        res.status(500).json({ error: 'Database query error', details: error.message });
    }
});

// Route to get fruit price by name
app.get('/api/fruit', async (req, res) => {
  const { name: fruitName } = req.query;

  if (!fruitName) {
      return res.status(400).json({ error: 'Fruit name is required' });
  }

  try {
      // Log the fruit name being requested
      console.log(`Fruit requested: ${fruitName}`);

      const query = await fs.readFile('./queries/getFruitPrice.sql', 'utf-8');

      // Log the SQL query before execution
      console.log('SQL query:', query);

      const connection = await mysql.createConnection(connectionConfig);

      // Log the parameters passed into the query
      console.log(`Executing query with parameter: ${fruitName}`);

      const [results] = await connection.query(query, [fruitName]);
      await connection.end();

      if (results.length > 0) {
          console.log('Query successful, returning data:', results[0]); // Log successful query results
          res.json(results[0]);
      } else {
          console.log(`No data found for fruit: ${fruitName}`);
          res.status(404).json({ error: 'Fruit not found' });
      }
  } catch (error) {
      // Log the error stack for debugging
      console.error('Error executing query:', error.stack || error);
      res.status(500).json({ error: 'Database query error', details: error.message });
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
