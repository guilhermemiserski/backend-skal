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

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
