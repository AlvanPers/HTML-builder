const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');
const distDir = path.join(__dirname, 'project-dist');

// Recursive function to copy directories
function copyDir(src, dest) {
  fs.mkdir(dest, { recursive: true }, (err) => {
    if (err) throw err;

    fs.readdir(src, (err, files) => {
      if (err) throw err;

      files.forEach((file) => {
        const srcFile = path.join(src, file);
        const destFile = path.join(dest, file);

        fs.stat(srcFile, (err, stat) => {
          if (err) throw err;

          if (stat.isDirectory()) {
            copyDir(srcFile, destFile);
          } else {
            fs.copyFile(srcFile, destFile, (err) => {
              if (err) throw err;
            });
          }
        });
      });
    });
  });
}

// Create project-dist directory
fs.mkdir(distDir, { recursive: true }, (err) => {
  if (err) throw err;

  // Copy assets directory
  copyDir(assetsDir, path.join(distDir, 'assets'));

  // Compile styles
  fs.readdir(stylesDir, (err, files) => {
    if (err) throw err;

    let cssFiles = files.filter((file) => path.extname(file) === '.css');

    cssFiles.forEach((file) => {
      let filePath = path.join(stylesDir, file);

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;

        fs.appendFile(path.join(distDir, 'style.css'), data + '\n', (err) => {
          if (err) throw err;
        });
      });
    });
  });

  // Replace template tags
  fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, data) => {
    if (err) throw err;

    let html = data;

    fs.readdir(componentsDir, (err, files) => {
      if (err) throw err;

      let htmlFiles = files.filter((file) => path.extname(file) === '.html');

      htmlFiles.forEach((file) => {
        let filePath = path.join(componentsDir, file);

        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) throw err;

          let tagName = path.basename(file, '.html');
          let regex = new RegExp(`{{${tagName}}}`, 'g');

          html = html.replace(regex, data);

          fs.writeFile(path.join(distDir, 'index.html'), html, (err) => {
            if (err) throw err;
          });
        });
      });
    });
  });
});
