const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Привет! Введите текст:');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('До свидания!');
    process.exit(0);
  } else {
    fs.appendFile('02-write-file/02-write-file.txt', `${input}\n`, (err) => {
      if (err) throw err;
      console.log(
        'Текст был добавлен в файл. Введите еще текст или введите "exit" для выхода или намите ctrl+c.',
      );
    });
  }
});

process.on('SIGINT', () => {
  console.log('\nДо свидания!');
  process.exit(0);
});
