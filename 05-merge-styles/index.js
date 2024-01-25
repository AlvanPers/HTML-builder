// const fs = require('fs');
// const path = require('path');

// function mergeStyles(src, dest) {
//   if (!fs.existsSync(dest)) {
//     fs.mkdirSync(dest, { recursive: true });
//   }
//   const entries = fs.readdirSync(src, { withFileTypes: true });

//   const writeStream = fs.createWriteStream(path.join(dest, 'bundle.css'));

//   for (let entry of entries) {
//     const srcPath = path.join(src, entry.name);

//     if (entry.isFile() && path.extname(srcPath) === '.css') {
//       const data = fs.readFileSync(srcPath, 'utf8');
//       writeStream.write(data);
//     }
//   }

//   writeStream.end();
// }

// mergeStyles('./05-merge-styles/styles', './05-merge-styles/project-dist');

const fs = require('fs');
const path = require('path');
const absoluteFrom = path.resolve(__dirname, 'styles');
const absoluteTo = path.resolve(__dirname, 'project-dist');
const files = fs.readdirSync(absoluteFrom);
const arr = [];
for (const file of files) {
  const fileConf = fs.statSync(`${absoluteFrom}/${file}`);
  const extN = path.extname(`${absoluteFrom}/${file}`);
  if (fileConf.isFile() && extN === '.css') {
    const fileContent = fs.readFileSync(`${absoluteFrom}/${file}`, 'utf-8');
    arr.push(fileContent);
  }
}
const bundleContent = arr.join('');
fs.writeFileSync(`${absoluteTo}/bundle.css`, bundleContent);
