const fileSize = 32;                    // Сколько чисел в файле
const capacity = 4;                     // Объем буфера

const numFiles = fileSize / capacity;   // Сколько будет временных файлов

const tempPath = './temp';              // Временные файлы
const filePath = './data/data.csv';     // Источник
const outPath = './data/data_s.csv'     // Конечный результат

const clearTmp = true;                  // Удалять ли временные файлы

module.exports = { fileSize, capacity, numFiles, tempPath, filePath, outPath, clearTmp }