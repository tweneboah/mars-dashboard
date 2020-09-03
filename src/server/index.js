require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));

// your API calls

//get curiosity data
app.get('/curiosity', async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=10&api_key=Or9r2rTMDXDNmhO9WxmB55G5yQLRMLcu0mTsS0jO`
    );
    const data = await image.json();

    const roverImages = data.photos.splice(0, 5);
    const roverData = data.photos[0];
    res.send({ roverData, roverImages });
  } catch (err) {
    console.log('error:', err);
  }
});

//get curiosity opportunity
app.get('/opportunity', async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=10&api_key=Or9r2rTMDXDNmhO9WxmB55G5yQLRMLcu0mTsS0jO`
    );
    const data = await image.json();

    const roverImages = data.photos.splice(0, 5);
    const roverData = data.photos[0];
    res.send({ roverData, roverImages });
  } catch (err) {
    console.log('error:', err);
  }
});

//get curiosity opportunity
app.get('/spirit', async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=10&api_key=Or9r2rTMDXDNmhO9WxmB55G5yQLRMLcu0mTsS0jO`
    );
    const data = await image.json();

    const roverImages = data.photos.splice(0, 5);
    const roverData = data.photos[0];
    res.send({ roverData, roverImages });
  } catch (err) {
    console.log('error:', err);
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
