const fs = require('fs').promises;
const path = require('path');

async function copyDir(src, dest) {
  try {
    await fs.access(dest);
  } catch {
    await fs.mkdir(dest, { recursive: true });
  }

  const srcEntries = await fs.readdir(src, { withFileTypes: true });
  const destEntries = await fs.readdir(dest, { withFileTypes: true });

  for (let destEntry of destEntries) {
    if (!srcEntries.find((srcEntry) => srcEntry.name === destEntry.name)) {
      const destPath = path.join(dest, destEntry.name);
      if (destEntry.isDirectory()) {
        await fs.rm(destPath, { recursive: true, force: true });
      } else {
        await fs.unlink(destPath);
      }
    }
  }
  for (let srcEntry of srcEntries) {
    const srcPath = path.join(src, srcEntry.name);
    const destPath = path.join(dest, srcEntry.name);

    if (srcEntry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

copyDir('./04-copy-directory/files', './04-copy-directory/files-copy');
