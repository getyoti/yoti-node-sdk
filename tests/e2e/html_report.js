require('babel-register');

const fileUtils = require('./support/utils/file_utils');
const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'hierarchy',
    jsonFile: fileUtils.getJsonFilePath(),
    output: fileUtils.getHtmlReportFilePath(),
    reportSuiteAsScenarios: true,
    launchReport: true,
};

reporter.generate(options);
process.exit();
