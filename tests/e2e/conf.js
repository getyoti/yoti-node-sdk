// use babel to transpile ES6 syntax to ES5
require('babel-register');

let screenShotUtils = require('protractor-screenshot-utils').ProtractorScreenShotUtils;

const fileUtils = require('./support/utils/file_utils');
const directoryUtils = require('./support/utils/directory_utils');
const chromeOptions = require('./support/utils/browser/chrome_options');

exports.config = {
    // only works with Chrome and Firefox
    directConnect: true,

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: chromeOptions.getOptions(),
        },
        acceptInsecureCerts: true,
    },

    // set to "custom" instead of cucumber.
    framework: 'custom',

    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        './features/*.feature',
    ],

    // stops more noise being output to the console when the test fails
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
        // create report folder if it does not exist
        directoryUtils.createDirectory();

        // non-angular web apps and sites should set ignoreSynchronization to true
        browser.ignoreSynchronization = true;
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        global.screenShotUtils = new screenShotUtils({
            browserInstance: browser
        });
    },

    /**
     * A callback function called once configs are read but before any
     * environment setup. This will only run once, and before onPrepare.
     *
     * You can specify a file containing code to run by setting beforeLaunch to
     * the filename string.
     *
     * At this point, global variable 'protractor' object will NOT be set up,
     * and globals from the test framework will NOT be available. The main
     * purpose of this function should be to bring up test dependencies.
     */
    beforeLaunch: () => {
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

    /**
     * A callback function called once the tests have finished running and
     * the WebDriver instance has been shut down. It is passed the exit code
     * (0 if the tests passed). This is called once per capability.
     */
    onCleanUp: () => {
    },

    /**
     * A callback function called once all tests have finished running and
     * the WebDriver instance has been shut down. It is passed the exit code
     * (0 if the tests passed). afterLaunch must return a promise if you want
     * asynchronous code to be executed before the program exits.
     * This is called only once before the program exits (after onCleanUp).
     */
    afterLaunch: () => {
    },

    cucumberOpts: {
        strict: true,
        // run all tags which are not tagged as ignore if no feature tags specified
        tags: process.env.TAGS || '~@ignore',
        require: [
            './support/world.js',
            './stepdefs/*.js',
        ],
        format: ['node_modules/cucumber-pretty', `json:${fileUtils.getJsonFilePath()}`],
    },
};
