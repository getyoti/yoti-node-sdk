# E2E test for SDK

### This is still a WIP but the idea is that we would deploy the [virtual-device-server](https://github.com/lampkicking/virtual-device-server) to our own test environment, which we would use to help us programmatically bypass the QR code scanning

- The E2E test framework is made up of **protractor**, **protractor-cucumber** and **babel** as well as **babel plugins**
to take advantage of ES6 syntax and be able to transpile into ES5
- **JIMP (JavaScript Image Manipulation Program)** is the image manipulation library used to read the QR code image file
- **JSQR** is the library used for decoding the QR code from the QR code image file
- **protractor-screenshot-utils** is the library used to take a screenshot of the DOM element that is the QR code


## Sample Test
The E2E test runs sample tests against **Yoti Sign** and **Yoti Connections**, it grabs the QR code
from the DOM element specified, decodes the QR code to reveal the URL

What you need to be aware of, is that you need to specify the DOM element that represents the QR code, example:
```
// This is the QR code DOM element
const qrCode = element(by.css('#canvas'));

// Specify the DOM element here, provide a filename because this utility function will save the QR code into
an image file, if a filename is not specified it will save it as 'qr-code.png'
const data = await decodeQRCode(qrCode, 'yoti-connections-qr-code.png');
```


## Feature Files
The E2E test is represented in the feature file:
- The **feature file** contains scenarios which represent the tests
- The **scenarios** are made up of **steps**
- The **steps** are **mapped** to **step definition code**. When the cucumber test runner runs through
the scenarios it will run through the steps and the step definition **will call functions to execute**
- The functions that interact with the pages are represented by the **page object classes**


## Setup

Open up a terminal in this directory, execute
```
npm i
```
Then run
```
webdriver-manager update
```
This will use webdriver-manager which manages the installation of the browser drivers.

**Instructions below will detail how to run the tests:**

Run the script, which will run the tests AND then runs the reporter. Which generates a html test report
```
./run.sh
```

OR in a terminal, run the following to just run the tests
```
HEADLESS=true TAGS=@complete npm test
```

## Config Variables

The **HEADLESS** environment variable is used to define whether you want the test to run in a headless chrome browser
```
HEADLESS=true
```

The **TIMEOUT** environment variable is used to define the cucumber step timeout, it is defined in milliseconds.
Default timeout is 300000 milliseconds if a timeout is not specified.

If you choose to run the **`run.sh`** script, it runs the tests with a timeout of 5 minutes
```
TIMEOUT=300000
```

The **CONSOLE_LOG** environment variable is used to define whether you want to display the browser's console to be output in the test report in the test report
```
CONSOLE_LOG=true
```

## View Test Results
You can view the test results of the latest ui test run in a html page with graphs.
To do this first run the ui tests, then run:
```
npm run report
```

You will find .json and .html files under the e2e/report directory.
- The .json is generated after the test run.
- The .html file is generated after running ```npm run report```
