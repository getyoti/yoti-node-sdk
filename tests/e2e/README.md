# E2E test for SDK

- The E2E test framework is made up of **protractor**, **protractor-cucumber** and **babel** as well as **babel plugins**
to take advantage of ES6 syntax and be able to transpile into ES5
- **JIMP (JavaScript Image Manipulation Program)** is the image manipulation library used to read the QR code image file
- **JSQR** is the library used for decoding the QR code from the QR code image file
- **protractor-screenshot-utils** is the library used to take a screenshot of the QR code only as opposed to the whole
page screenshot


## Feature files
The E2E test is represented in the feature file:
- The **feature file** contains scenarios which represent the tests
- The **scenario** are made up of gherkin steps
- The **steps** are **linked** to **step definition code**, which **maps** the step to the step definition.
The step definition **calls the functions to execute**, when the cucumber test runner runs through the scenarios


**Setup**

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

Run the script, which will run the tests AND then run the reporter to show the generated test report
```
./run.sh
```

OR in a terminal, run the following to just run the tests
```
HEADLESS=true TAGS=@complete npm test
```

**View test results**
You can view the test results of the latest ui test run in a html page with graphs.
To do this first run the ui tests, then run:
```
npm run report
```

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

The **CONSOLE_LOG** environment variable is used to define whether you want to display the browser's console to be output in the test report
in the test report
```
CONSOLE_LOG=true
```
