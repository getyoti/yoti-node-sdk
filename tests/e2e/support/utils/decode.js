import JSQR from 'jsqr';
import JIMP from 'jimp';

const screenshotElement = async (element, fileName) => {
    await screenShotUtils.takeScreenshot({
        element : element,
        saveTo: fileName
    })
};

const decode = async (imageFile) => {
    const image = await JIMP.read(imageFile);
    const value = await JSQR(image.bitmap.data, image.bitmap.width, image.bitmap.height);
    return value.data;
};

export default async (qrCode, fileName) => {
    const qrCodeImageFile = fileName || 'qr-code.png';
    await screenshotElement(qrCode, qrCodeImageFile);
    return decode(qrCodeImageFile);
};
