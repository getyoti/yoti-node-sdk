import { setDefaultTimeout } from 'cucumber';

// Set global timeout for step definition functions in milliseconds
setDefaultTimeout(30000);

// cucumber allows global functions and properties to be set here and used in all step definitions classes
/**

 const { setWorldConstructor } = require('cucumber')

 class CustomWorld {
    constructor() {
        this.variable = 0
    }

    setTo(number) {
        this.variable = number
    }

    incrementBy(number) {
        this.variable += number
    }
    }

 setWorldConstructor(CustomWorld)

 **/
