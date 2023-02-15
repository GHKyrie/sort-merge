const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream/promises');
const readline = require('readline');

async function merge(tmpFileNames, fileName, capacity) {
    console.log('Merging started...');
    // Тут пишем
    const file = createWriteStream(fileName, { highWaterMark: capacity });
    // Тут читаем
    const activeReaders = tmpFileNames.map(name => 
            readline.createInterface({ 
                input: createReadStream(name, { highWaterMark: capacity }), 
                crlfDelay: Infinity 
            })[Symbol.asyncIterator]());
    // Получаем значения (Первый элемент каждого файла)
    const values = await Promise.all(activeReaders.map(r => r.next().then(e => parseFloat(e.value))));
    // Сортировка + слияние
    return pipeline(
        async function* () {
            // Пока есть что считывать
            while (activeReaders.length > 0) {
                // Ищем минимум и его индекс
                const [minVal, i] = values.reduce((prev, cur, idx) => cur < prev[0] ? [cur, idx] : prev, [Infinity, -1]);
                // Выдаем минимум
                yield `${minVal}\n`;
                const res = await activeReaders[i].next();
                // Достаем значения, режем массивы
                if (!res.done) 
                    values[i] = parseFloat(res.value);
                else {
                    values.splice(i, 1);
                    activeReaders.splice(i, 1);
                }
            }
        },
        file
    );
}

module.exports = { merge }