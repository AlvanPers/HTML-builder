const fs = require('fs');
const path = require('path');

async function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const srcEntries = fs.readdirSync(src, { withFileTypes: true });
  const destEntries = fs.readdirSync(dest, { withFileTypes: true });

  for (let destEntry of destEntries) {
    if (!srcEntries.find((srcEntry) => srcEntry.name === destEntry.name)) {
      const destPath = path.join(dest, destEntry.name);
      if (destEntry.isDirectory()) {
        fs.rmdirSync(destPath, { recursive: true });
      } else {
        fs.unlinkSync(destPath);
      }
    }
  }
  for (let srcEntry of srcEntries) {
    const srcPath = path.join(src, srcEntry.name);
    const destPath = path.join(dest, srcEntry.name);

    if (srcEntry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir('./04-copy-directory/files', './04-copy-directory/files-copy');
