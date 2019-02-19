const until = protractor.ExpectedConditions;

export const untilAllClickable = async (elementArray) => {
    await elementArray.each(async (element) => {
        await browser.wait(until.elementToBeClickable(element));
    });
};

export const untilPresent = async (element) => {
    await browser.wait(until.presenceOf(element));
};

export const untilClickable = async (element) => {
    await browser.wait(until.elementToBeClickable(element));
};

export const untilVisible = async (element) => {
    await browser.wait(until.visibilityOf(element));
};

export const untilStale = async (element) => {
    await browser.wait(until.stalenessOf(element));
};

export const untilNotStale = async (element) => {
    await browser.wait(until.not(until.stalenessOf(element)));
};

export const untilTextPresent = async (element, text) => {
    await browser.wait(until.textToBePresentInElement(element, text));
};

export const untilPageToLoad = async () => {
    await browser.executeScript('return document.readyState === "complete"', null);
};
