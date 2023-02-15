const { merge } = require('./mergelists');

const mergeFiles = async (tempPath, outPath, capacity, numFiles, emitter) => {    
    const fileNames = [];
    // Названия файлов
    for (let i = 0; i < numFiles; i++) 
        fileNames.push(`${tempPath}/tmp_${i}_s.csv`);
    // Ждем слияния
    await merge(fileNames, outPath, capacity);
    // Событие завершения слияния
    emitter.emit('merged');
}

module.exports = { mergeFiles }