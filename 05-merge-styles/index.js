const fs = require('fs');
const path = require('path');

function mergeStyles(src, dest) {
  // Создаем папку назначения, если она еще не существует
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Читаем содержимое исходной папки
  const entries = fs.readdirSync(src, { withFileTypes: true });

  // Создаем поток записи для файла bundle.css
  const writeStream = fs.createWriteStream(path.join(dest, 'bundle.css'));

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);

    if (entry.isFile() && path.extname(srcPath) === '.css') {
      // Если элемент является CSS-файлом, читаем его и записываем в bundle.css
      const data = fs.readFileSync(srcPath, 'utf8');
      writeStream.write(data);
    }
  }

  writeStream.end();
}

mergeStyles('./05-merge-styles/styles', './05-merge-styles/project-dist');
