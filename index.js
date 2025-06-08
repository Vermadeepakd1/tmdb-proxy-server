import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_READ_TOKEN = process.env.TMDB_READ_TOKEN; // store token securely in .env

app.get('/api/popular', async (req, res) => {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`, {
            headers: {
                Authorization: `Bearer ${TMDB_READ_TOKEN}`,
                accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`TMDB fetch failed with status ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('TMDB fetch error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from TMDB' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
