const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputDir, 'bundle.css');

fs.readdir(stylesDir, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }

  let cssFiles = files.filter((file) => path.extname(file) === '.css');

  fs.mkdir(outputDir, { recursive: true }, (err) => {
    if (err) {
      return console.error('Unable to create directory: ' + err);
    }

    cssFiles.forEach((file, i) => {
      let filePath = path.join(stylesDir, file);

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return console.error('Unable to read file: ' + err);
        }

        fs.appendFile(outputFile, data + '\n', (err) => {
          if (err) {
            return console.error('Unable to write file: ' + err);
          }

          if (i === cssFiles.length - 1) {
            console.log(
              'Styles have been successfully compiled into bundle.css',
            );
          }
        });
      });
    });
  });
});
