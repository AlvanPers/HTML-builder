const fs = require('fs');
const path = require('path');

function mergeStyles(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });

  const writeStream = fs.createWriteStream(path.join(dest, 'bundle.css'));

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);

    if (entry.isFile() && path.extname(srcPath) === '.css') {
      const data = fs.readFileSync(srcPath, 'utf8');
      writeStream.write(data);
    }
  }

  writeStream.end();
}

mergeStyles('./05-merge-styles/styles', './05-merge-styles/project-dist');
