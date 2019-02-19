# Running UI tests

**Setup**

Open up a terminal in this directory, execute
```
npm i
```
Then run
```
webdriver-manager update
```
This will install webdriver-manager which manages the browser drivers.

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

The *HEADLESS* environment variable is used to define whether you want the ui tests to run in a headless chrome browser,
not applicable for other browsers, only works in chrome.
```
HEADLESS=true
```

The *TIMEOUT* environment variable is used to define the cucumber step timeout, it is defined in milliseconds.
Default timeout is 30000 milliseconds if a timeout is not specified.
The run.sh script runs the tests with a timeout of 5 minutes
```
TIMEOUT=30000
```

The *CONSOLE_LOG* environment variable is used to define whether you want the browser's console logs to be output
in the test report
```
CONSOLE_LOG=true
```
