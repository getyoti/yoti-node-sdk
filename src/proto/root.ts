import fs = require('fs');
import path = require('path');
import ProtoBuf = require('protobufjs');

function getFilesPathsRecursively(directory: string, origin?: string): string[] {
  return fs.readdirSync(directory)
    .reduce((files: string[], file: string) => {
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

export default root;
