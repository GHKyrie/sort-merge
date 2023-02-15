const fs = require('fs');
const os = require('os');

const { quickSort } = require('./quicksort');

const sorter = (file) => {
    if (!fs.existsSync(file))
        return;
    // Читаем 
    let data = fs.readFileSync(file.toString(), "utf8");    
    // Убираем запятую с конца строки
    if (data[data.length - 1] == ',') 
        data = data.slice(0, -1);
    // Делаем массив чисел из строки
    data = data.split(',').map(Number);
    // Сортируем быстрой сортировкой
    return quickSort(data);
}

const sortFiles = (tmpPath, numberFiles, emitter) => {
    for (let i = 0; i < numberFiles; i++) {
        const sortedData = sorter(`${tmpPath}/tmp_${i}.csv`);
        // Если данные отсортировались, пишем в файл
        if (sortedData)
            for (let j = 0; j < sortedData.length; j++) 
                fs.appendFileSync(`${tmpPath}/tmp_${i}_s.csv`, sortedData[j].toString() + os.EOL);

        console.log(`File ${i} was sorted`);
    }   // Событие завершения сортировки
    emitter.emit('sorted'); 
}

module.exports = { sorter, sortFiles }