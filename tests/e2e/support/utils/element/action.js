import * as wait from './wait';

export const useScriptToClick = async (element) => {
    await browser.executeScript('return arguments[0].click()', element);
};

export const useScriptToClickAll = async (elementArray) => {
    await elementArray.each(async (element) => {
        await browser.executeScript('return arguments[0].click()', element);
        await wait.untilStale(element);
    });
};

export const clickAll = async (elementArray) => {
    await elementArray.each(async (element) => {
        await element.click();
        await wait.untilStale(element);
    });
};

export const scrollIntoView = async (element) => {
    await browser.executeScript('return arguments[0].scrollIntoView();', element);
};