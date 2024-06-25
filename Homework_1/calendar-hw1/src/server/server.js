const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_database_name',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

// POST endpoint to save votes
app.post('/api/saveVotes', (req, res) => {
    const { votes } = req.body;

    // Example: Assuming `votes` is an array of objects { date: string, hour: number }
    votes.forEach((vote) => {
        const { date, hour } = vote;
        const insertQuery = `INSERT INTO votes (date, hour) VALUES (?, ?)`;
        db.query(insertQuery, [date, hour], (err, result) => {
            if (err) {
                console.error('Error inserting vote:', err);
            } else {
                console.log(`Vote inserted successfully for ${date}, hour ${hour}`);
            }
        });
    });

    res.status(200).json({ message: 'Votes saved successfully' });
});

// GET endpoint to fetch votes
app.get('/api/getVotes', (req, res) => {
    const selectQuery = `SELECT * FROM votes`;
    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error fetching votes:', err);
            res.status(500).json({ error: 'Failed to fetch votes' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
