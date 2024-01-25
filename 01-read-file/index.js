const fs = require('fs');

const readStream = fs.createReadStream('./01-read-file/text.txt', 'utf8');

readStream
  .on('data', function (chunk) {
    console.log(chunk);
  })
  .on('end', function () {
    console.log('Reading finished');
  })
  .on('error', function (err) {
    console.log('An error has occurred: ' + err.message);
  });
