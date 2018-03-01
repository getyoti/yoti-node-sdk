// AML check example for countries outside the USA
// Requires first names, last name and ISO 3166 3-letter country code

require('dotenv').config();
const fs = require('fs');
const Yoti = require('yoti');

const config = {
  CLIENT_SDK_ID: process.env.YOTI_CLIENT_SDK_ID, // Your Yoti Client SDK ID
  PEM_KEY: fs.readFileSync(process.env.YOTI_KEY_FILE_PATH), // The content of your Yoti .pem key
};

const firstName = 'Edward Richard George';
const lastName = 'Heath';
const countryCode = 'GBR';

const yoti = new Yoti.Client(config.CLIENT_SDK_ID, config.PEM_KEY);
const amlAddress = new Yoti.AmlAddress(countryCode);
const amlProfile = new Yoti.AmlProfile(firstName, lastName, amlAddress);


yoti.performAmlCheck(amlProfile).then((amlResult) => {
  console.log(`On PEP list: ${amlResult.isOnPepList}`);
  console.log(`On fraud list: ${amlResult.isOnFraudList}`);
  console.log(`On watch list: ${amlResult.isOnWatchList}`);

  console.log('\nAML check result:');
  console.log(amlResult);
}).catch((err) => {
  console.error(err);
});
