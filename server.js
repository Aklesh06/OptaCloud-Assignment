import express from 'express';
import env from 'dotenv';
import axios from 'axios';
import cors from 'cors';

env.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())

app.get('/get-api-key',(req, res) => {
     res.json({apiKey: process.env.REACT_APP_GOOGLE_API_KEY});
})

app.get('/geocode', async (req, res) => {
    const { address } = req.query;
    
    if (!address) {
      return res.status(400).send({ error: 'Address is required' });
    }

    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address,
          key: process.env.REACT_APP_GOOGLE_API_KEY,
        },
      });
      console.log(response.data)
      res.send(response.data);
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
      res.status(500).send({ error: 'Failed to fetch geocoding data' });
    }
  });

app.listen(port, () => {
    console.log(`Server at port ${port}`);
})





