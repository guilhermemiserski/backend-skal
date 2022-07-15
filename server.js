const axios = require('axios');
const FormData = require('form-data');
const express = require ('express');
const fs = require('fs');

const data = new FormData();
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.get('/', (req,res) =>  {
  res.render('./index.html')
})

let ifps = '';

app.post('/enviar' , async (req,res) => {
  console.log(req.body);
  data.append('metadata', '{"name":"nome", "description":"descricao"}');
  data.append('image', fs.createReadStream('./images/Logo.png'));
  data.append('asset', fs.createReadStream('./images/Logo.png'));
  
  var options = {
    method: 'POST',
    url: 'https://api.mintnft.today/v1/upload/single',
    headers: {
      'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
      'x-api-key': '7852fc13-98cd-41a6-a0aa-4571efeeed5c'
    },
    data: data
  };

  axios.request(options).then(async function (response) {
    console.log(response.data);
    ifps = response.data.data.url;

    res.render('./mint.html');
  }).catch(function (error) {
  console.error(error);
});

})


app.post('/mint', (req,res) => {
  console.log(ifps)
  let dataJson = {
    "wallet": "0x860b487fa7087653739832Cc82b7cF53995DC4be",
    "type": "ERC721", //or ERC1155
    "network" : "mainnet",
    "amount": 1,
    "tokenCategory": "soulbound", //optional (Only applicable for type ERC721)
    "tokenUri": ifps
  }
  const opts = {
    method: 'POST',
    url: 'https://api.mintnft.today/v1/mint/single',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '7852fc13-98cd-41a6-a0aa-4571efeeed5c'
    },
    data: dataJson,
  }
   axios.request(opts).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err);
  })
})