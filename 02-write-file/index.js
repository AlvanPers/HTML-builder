const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeStream = fs.createWriteStream('./02-write-file/text.txt', {
  flags: 'a',
});

console.log('Hello! Enter text:');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Goodbye!');
    rl.close();
  } else {
    writeStream.write(`${input}\n`);
    console.log(
      'The text has been added to the file. Enter more text or enter "exit" to exit or press ctrl+c.',
    );
  }
});

rl.on('SIGINT', () => {
  console.log('\nGoodbye!');
  rl.close();
});
