const fs = require('fs');
// Обработчик событий
const { EventEmitter } = require('node:events');
// Процедуры
const { processLineByLine } = require('./helpers/processLines');
const { sortFiles } = require('./helpers/sorter');
const { mergeFiles } = require('./helpers/merger');
// Директории и объем буфера
const { filePath, tempPath, outPath } = require('./helpers/config');
const { capacity, numFiles } = require('./helpers/config');
// Для очистки
const { cleanup } = require('./helpers/cleanup');
const { clearTmp } = require('./helpers/config');

// Обработчик для выстраивания порядка
const emitter = new EventEmitter();    

// Если директории нет - создаем
if (!fs.existsSync(tempPath)) 
    fs.mkdirSync(tempPath);

// Делим файл на равные части
processLineByLine(filePath, tempPath, capacity, emitter);

// После разделения сортируем каждый файл
emitter.on('split', () => {
    console.log('File splitting done!');
    sortFiles(tempPath, numFiles, emitter);
});

// После сортировки делаем слияние
emitter.on('sorted', () => {
    console.log('Sorting is finished!');
    mergeFiles(tempPath, outPath, capacity, numFiles, emitter);
});

// Чистим временные файлы после слияния
emitter.on('merged', () => { 
    console.log('Merging is finished!');
    if (clearTmp) {
        cleanup(tempPath);
        console.warn('Temporary files were deleted');
    }     
});