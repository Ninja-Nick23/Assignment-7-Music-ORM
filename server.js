const express = require('express');
const { sequelize, Track } = require('./database/setup');

const app = express();
app.use(express.json());

// GET all tracks
app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET track by ID
app.get('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) return res.status(404).json({ error: "Track not found" });
    res.json(track);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST create track
app.post('/api/tracks', async (req, res) => {
  try {
    const newTrack = await Track.create(req.body);
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(400).json({ error: "Invalid input" });
  }
});

// PUT update track
app.put('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) return res.status(404).json({ error: "Track not found" });

    await track.update(req.body);
    res.json(track);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE track
app.delete('/api/tracks/:id', async (req, res) => {
  try {
    const deleted = await Track.destroy({ where: { trackId: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Track not found" });

    res.json({ message: "Track deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
