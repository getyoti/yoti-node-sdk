import util from 'util';
import { Before, After } from 'cucumber';

/*
"Multiple After hooks are executed in the reverse order that they were defined."
https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/hooks.md#user-content-hooks
 */

// Arrow functions are not supported for taking screenshots on failure
// https://github.com/cucumber/cucumber-js/blob/dfbfed94e2cee4fd6b1f91299f7b450b271f9145/docs/faq.md
After(function () {
    const world = this;
    if (process.env.CONSOLE_LOG === 'true') {
        browser.manage().logs().get('browser').then(function (browserLog) {
            return world.attach(util.inspect(browserLog));
        });
    }
    return browser.takeScreenshot().then(function (base64EncodedImage) {
        return world.attach(Buffer.from(base64EncodedImage.toString(), 'base64'), 'image/png');
    });
});

/*
Multiple Before hooks are executed in the order that they were defined.
 */

// Delete all cookies before running test
Before(async () => {
    await browser.driver.manage().deleteAllCookies();
});
