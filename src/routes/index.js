const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

const API_KEY = "ikwmC7O4fi1lVvGBE3mwcJ3jSSbGfZWDf9eHVnXD";
const url = "https://api.nasa.gov/planetary/earth/assets?";
const fecha = "2020-9-1";
const dim = "0.055";

const options = {
  "method": "GET",
};

router.get('/', (req, res) => {
  res.render('index.html', { title: 'RSM - Busqueda de fotografias aereas' });
});

router.post('/tiles', (req, res) => {
  const coordenadas = req.body.coordenadas.split(',');

  var lat = coordenadas[0]; 
  var lon= coordenadas[1];
  
  if(process.argv.length==4) {
    var parts = process.argv.slice(2);
    lat = parts[0].replace(',','').trim();
    lon = parts[1].replace(',','').trim();
  } 
//lon=-95.33&lat=29.78&date=2018-01-01&&dim=0.10&api_key="+API_KEY;
  console.log(url+'lon='+lon+'&lat='+lat+'&date='+fecha+'&dim='+dim+'&api_key='+API_KEY);
  fetch(url+'lon='+lon+'&lat='+lat+'&date='+fecha+'&dim='+dim+'&api_key='+API_KEY, options)
    .then(res => res.json()) // expecting a json response
    .then((data) => {
      const imagen = data.url;
      res.render('tiles.html', { title: 'Coordenadas', img: imagen });
    });

});


module.exports = router;