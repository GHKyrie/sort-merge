const fs = require('fs');
const { tempPath } = require('./config');
// Чистим временные файлы
const cleanup = (path = tempPath) => fs.rmSync(path, { recursive: true, force: true });

cleanup();

module.exports = { cleanup }