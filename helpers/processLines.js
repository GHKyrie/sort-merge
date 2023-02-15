const readline = require('readline');
const fs = require('fs');

let currentLine = 0;    // Счетчик для строк
let currentFile = 0;    // Счетчик для файлов

const processLineByLine = async (path, tmpPath, cap, emitter) => {
    try {
        currentLine = 0;
        currentFile = 0;
        // Считываем файл по строке за раз
        const rl = readline.createInterface({
            input: fs.createReadStream(path),
            crlfDelay: Infinity
        });
    
        console.log('Processing data...');

        rl.on('line', (line) => { 
            // Делим на равные части
            if (currentLine != 0 && currentLine % cap == 0)
                currentFile++; 
            // Считанную строку записали
            fs.appendFileSync(`${tmpPath}/tmp_${currentFile}.csv`, line);
            currentLine++;
        });
        rl.on('close', () => emitter.emit('split')); // Событие завершения обработки
        rl.on('error', () => console.error('Error while splitting!'));
    
    } catch (err) {console.error(err)}
}

module.exports = { processLineByLine }