import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Popular movies with pagination support
app.get('/api/popular', async (req, res) => {
    const page = req.query.page || 1;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`);
        if (!response.ok) throw new Error(`TMDB fetch failed with status ${response.status}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('TMDB fetch error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from TMDB' });
    }
});

// Search movies with pagination support
app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    const page = req.query.page || 1;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`);
        if (!response.ok) throw new Error(`TMDB fetch failed with status ${response.status}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('TMDB fetch error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from TMDB' });
    }
});

// New route to get movie details by ID
app.get('/api/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
        if (!response.ok) {
            throw new Error(`TMDB fetch failed with status ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('TMDB fetch error:', error.message);
        res.status(500).json({ error: 'Failed to fetch movie details from TMDB' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
