require('babel-register');

const screenShotUtils = require('protractor-screenshot-utils').ProtractorScreenShotUtils;
const fileUtils = require('./support/utils/file_utils');
const directoryUtils = require('./support/utils/directory_utils');
const chromeOptions = require('./support/utils/browser/chrome_options');

exports.config = {
    directConnect: true,
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: chromeOptions.getOptions(),
        },
        acceptInsecureCerts: true,
    },
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: [
        './features/*.feature',
    ],
    ignoreUncaughtExceptions: true,
    /**
     * A callback function called once protractor is ready and available, and
     * before the specs are executed. If multiple capabilities are being run,
     * this will run once per capability.
     *
     * You can specify a file containing code to run by setting onPrepare to
     * the filename string. onPrepare can optionally return a promise, which
     * Protractor will wait for before continuing execution. This can be used if
     * the preparation involves any asynchronous calls, e.g. interacting with
     * the browser. Otherwise Protractor cannot guarantee order of execution
     * and may start the tests before preparation finishes.
     *
     * At this point, global variable 'protractor' object will be set up, and
     * globals from the test framework will be available. For example, if you
     * are using Jasmine, you can add a reporter with:
     *
     *    jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(
     *      'outputdir/', true, true));
     *
     * If you need access back to the current configuration object,
     * use a pattern like the following:
     *
     *    return browser.getProcessedConfig().then(function(config) {
       *      // config.capabilities is the CURRENT capability being run, if
       *      // you are using multiCapabilities.
       *      console.log('Executing capability', config.capabilities);
       *    });
     */
    onPrepare: async () => {
        directoryUtils.createDirectory();
        browser.ignoreSynchronization = true;
        global.screenShotUtils = new screenShotUtils({
            browserInstance: browser
        });
    },
    /**
     * A callback function called once tests are finished. onComplete can
     * optionally return a promise, which Protractor will wait for before
     * shutting down webdriver.
     *
     * At this point, tests will be done but global objects will still be
     * available.
     */
    onComplete: async () => {
        await browser.close();
    },
    cucumberOpts: {
        strict: true,
        tags: process.env.TAGS || '~@ignore',
        require: [
            './support/world.js',
            './stepdefs/*.js',
        ],
        format: ['node_modules/cucumber-pretty', `json:${fileUtils.getJsonFilePath()}`],
    },
};
