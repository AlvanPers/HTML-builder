const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Hello! Enter text:');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Goodbye!');
    process.exit(0);
  } else {
    fs.appendFile('02-write-file/02-write-file.txt', `${input}\n`, (err) => {
      if (err) throw err;
      console.log(
        'The text has been added to the file. Enter more text or enter "exit" to exit or press ctrl+c.',
      );
    });
  }
});

process.on('SIGINT', () => {
  console.log('\nGoodbye!');
  process.exit(0);
});
