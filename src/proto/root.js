const fs = require('fs');
const path = require('path');
const ProtoBuf = require('protobufjs');

function getFilesPathsRecursively(directory, origin) {
  return fs.readdirSync(directory)
    .reduce((files, file) => {
      const absolute = path.join(directory, file);
      return [
        ...files,
        ...(fs.statSync(absolute).isDirectory()
          ? getFilesPathsRecursively(absolute, origin || directory)
          : [path.relative(origin || directory, absolute)]),
      ];
    }, [])
    .filter((file) => file.endsWith('.proto'));
}

const definitionsPath = path.join(__dirname, 'definitions');
const definitionsFiles = getFilesPathsRecursively(definitionsPath)
  .map((file) => path.join(definitionsPath, file));

const root = ProtoBuf.loadSync(definitionsFiles);

module.exports = root;
