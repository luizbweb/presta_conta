var str = 'Hello WORLD, nodejs';

console.log('------- indexOf ---------');
console.log(str.indexOf('ello'));
console.log(str.indexOf('nodejs'));
console.log(str.indexOf('e'));

console.log('------- lastIndexOf -------');
console.log(str.lastIndexOf('ello'));
console.log(str.lastIndexOf('nodejs'));
console.log(str.lastIndexOf('e'));

// Para string não encontrada retorna -1

console.log(str.indexOf('C#'));

// Case sensitive
console.log(str.indexOf('WORLD'));
console.log(str.indexOf('world'));

