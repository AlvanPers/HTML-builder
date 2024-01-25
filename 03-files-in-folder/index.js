const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'secret-folder');
//проверка каталога
fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('directory not found: ' + err);
  }
  // console.log(directoryPath);
  files.forEach(function (file) {
    const filePath = path.join(directoryPath, file);
    fs.stat(filePath, function (err, stats) {
      if (err) {
        return console.log('Unable to get file stats: ' + err);
      }
      if (!stats.isDirectory()) {
        const fileSizeInBytes = stats.size;
        const fileExtension = path.extname(file).slice(1);
        const fileName = path.basename(file, '.' + fileExtension);
        console.log(
          `${fileName}-${fileExtension}-${(fileSizeInBytes / 1024).toFixed(
            3,
          )} kbytes`,
        );
      }
    });
  });
});

//        другой способ
// const fs = require("fs");
// const path = require("path");
// const absoluteFrom = path.resolve(__dirname, "files");
// const absoluteTo = path.resolve(__dirname, "files-copy");
// const files = fs.readdirSync(absoluteFrom);

// for (const file of files) {
//     fs.copyFile(`${absoluteFrom}/${file}`, `${absoluteTo}/${file}`, (err) => {console.log(err)});
// }
