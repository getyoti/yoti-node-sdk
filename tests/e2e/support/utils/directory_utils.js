import fileSystem from 'fs';

// Starts from root directory
const reportDirectory = './report/';

export const createDirectory = () => {
    const directoryExists = fileSystem.existsSync(reportDirectory);
    if (!directoryExists) {
        fileSystem.mkdirSync(reportDirectory);
    }
};
