const fs = require('fs');
const path = require('path');

async function copyDir(src, dest) {
  fs.mkdir(dest, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(src, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);

      fs.stat(srcFile, (err, stat) => {
        if (err) throw err;

        if (stat.isFile()) {
          fs.copyFile(srcFile, destFile, (err) => {
            if (err) throw err;
          });
        }
      });
    });
  });
}

const srcDirectory = path.join(__dirname, 'files');
const destDirectory = path.join(__dirname, 'files-copy');

copyDir(srcDirectory, destDirectory);
