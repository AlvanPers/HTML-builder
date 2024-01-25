const fs = require('fs').promises;
const path = require('path');

async function mergeStyles(src, dest) {
  try {
    await fs.access(dest);
  } catch {
    await fs.mkdir(dest, { recursive: true });
  }

  const entries = await fs.readdir(src, { withFileTypes: true });

  const writeStream = require('fs').createWriteStream(
    path.join(dest, 'bundle.css'),
  );

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);

    if (entry.isFile() && path.extname(srcPath) === '.css') {
      const data = await fs.readFile(srcPath, 'utf8');
      writeStream.write(data);
    }
  }

  writeStream.end();
}

mergeStyles('./05-merge-styles/styles', './05-merge-styles/project-dist');
