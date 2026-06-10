import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8080;
const dataPath = path.join(process.cwd(), 'server', 'bookings.json');

app.use(cors());
app.use(express.json());

function readBookings() {
  if (!fs.existsSync(dataPath)) return [];
  return JSON.parse(fs.readFileSync(dataPath, 'utf8') || '[]');
}

app.get('/api/bookings', (_, res) => res.json(readBookings()));

app.post('/api/bookings', (req, res) => {
  const bookings = readBookings();
  const booking = { id: Date.now().toString(), ...req.body };
  fs.writeFileSync(dataPath, JSON.stringify([booking, ...bookings], null, 2));
  res.status(201).json({ message: 'Booking saved', booking });
});

app.listen(PORT, () => console.log(`YURI booking server running on http://localhost:${PORT}`));
