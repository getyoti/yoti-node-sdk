export const getOptions = () => {
    const chromeOptions = [
        '--disable-gpu',
        '--window-size=1280,1024',
        '--no-sandbox',
    ];
    if (process.env.HEADLESS === 'true') {
        chromeOptions.push('--headless');
    }
    // Commented out due to causing chrome not to go to the base url
    // chromeOptions.push('--remote-debugging-port=9222');
    return chromeOptions;
};
