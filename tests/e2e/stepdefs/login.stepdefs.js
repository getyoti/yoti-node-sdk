import { Given } from 'cucumber';
import yotiConnectionsPage from '../pages/yoti-connections-page';
import yotiSignPage from '../pages/yoti-sign-page';
import decodeQRCode from '../support/utils/decode';

Given('I login to yoti connections', async () => {
    await yotiConnectionsPage.visit();

    const loginButton = yotiConnectionsPage.loginButton;
    await yotiConnectionsPage.waitUntilPresent(loginButton);
    await loginButton.click();

    const iHaveYotiButton = yotiConnectionsPage.iHaveYotiButton;
    await yotiConnectionsPage.waitUntilPresent(iHaveYotiButton);
    await iHaveYotiButton.click();

    const qrCode = yotiConnectionsPage.qrCode;
    await yotiConnectionsPage.waitUntilPresent(qrCode);
    const data = await decodeQRCode(qrCode, 'yoti-connections-qr-code.png');
    console.log();
    console.log(data);
});

Given('I login to yoti sign', async () => {
    await yotiSignPage.visit();

    const loginButton = yotiSignPage.loginButton;
    await yotiSignPage.waitUntilPresent(loginButton);
    await loginButton.click();

    const qrCode = yotiSignPage.qrCode;
    await yotiSignPage.waitUntilPresent(qrCode);
    const data = await decodeQRCode(qrCode, 'yoti-sign-qr-code.png');
    console.log();
    console.log(data);
});
