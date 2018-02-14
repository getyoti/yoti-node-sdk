# Yoti NodeJS SDK

Welcome to the Yoti NodeJS SDK. This repo contains the tools and step by step instructions you need to quickly integrate your NodeJS back-end with Yoti so that your users can share their identity details with your application in a secure and trusted way.

## Table of Contents

1) [An Architectural View](#an-architectural-view) -
High level overview of integration

2) [References](#references) -
Guides before you start

3) [Requirements](#requirements) -
Check you have what you need

4) [Installing the SDK](#installing-the-sdk) -
How to install our SDK

5) [Configuration](#configuration) -
How to initialise your configuration

6) [Profile Retrieval](#profile-retrieval) -
How to retrieve a Yoti profile using the token

7) [Handling Users](#handling-users) -
How to manage users

8) [AML Integration](#aml-integration) -
How to integrate with Yoti's AML (Anti Money Laundering) service

9) [Running the Example](#running-the-example)

10) [API Coverage](#api-coverage) -
Attributes defined

11) [Working on the SDK](#working-on-the-sdk) -
Working on the SDK

12) [Support](#support) -
Please feel free to reach out

## An Architectural View

To integrate your application with Yoti, your back-end must expose a GET endpoint that Yoti will use to forward tokens.
The endpoint can be configured in Yoti Dashboard when you create/update your application.

The image below shows how your application back-end and Yoti integrate in the context of a Login flow.
Yoti SDK carries out for you steps 6, 7 ,8 and the profile decryption in step 9.

![alt text](https://github.com/getyoti/yoti-node-sdk/raw/master/login_flow.png "Login flow")

Yoti also allows you to enable user details verification from your mobile app by means of the Android (TBA) and iOS (TBA) SDKs. In that scenario, your Yoti-enabled mobile app is playing both the role of the browser and the Yoti app. By the way, your back-end doesn't need to handle these cases in a significantly different way. You might just decide to handle the `User-Agent` header in order to provide different responses for web and mobile clients.

## References

* [AES-256 symmetric encryption](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
* [RSA pkcs asymmetric encryption](https://en.wikipedia.org/wiki/RSA_(cryptosystem))
* [Protocol buffers](https://en.wikipedia.org/wiki/Protocol_Buffers)
* [Base64 data](https://en.wikipedia.org/wiki/Base64)

## Requirements

If you're planning on using the Node SDK on Windows, you'll need to install a few dependencies first:

* [OpenSSL](http://slproweb.com/products/Win32OpenSSL.html) (normal version, not light) in the same bitness as your Node.js installation.

  * OpenSSL must be installed in its specific directory (`C:\OpenSSL-Win32` or `C:\OpenSSL-Win64`)
  * The latest version of OpenSSL (v1.1.x) does not have the `libeay32.dll` file. **Install v1.0.2 instead**.
  * If you get `Error: The specified module could not be found.`, copy `libeay32.dll` from the OpenSSL bin directory to this module's bin directory, or to `Windows\System32`.

* [node-gyp](https://github.com/nodejs/node-gyp) (`npm install -g node-gyp`)

  * Either install Microsoft's [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) using `npm install --global --production windows-build-tools`
  * Or manually install [Python 2.7](http://www.python.org/download/) and [Visual Studio](https://www.visualstudio.com/downloads/) (or modify an existing installation) and select Common Tools for Visual C++ during setup.

## Installing the SDK

To import the Yoti SDK inside your project, you can use your favourite dependency management system.
If you are using NPM, you can use the following command to set the Yoti SDK as a dependency:

```shell
npm install -S -E yoti
```

Your package.json file will then be updated to include:

```json
"dependencies": {
     "yoti" : "x.x.x"
 }
 ```

## Configuration

The YotiClient is the SDK entry point. To initialise it you need include the following snippet inside your endpoint initialisation section:

```javascript

const YotiClient = require('yoti')
const YotiEntity = require('yoti/src/yoti_entity');
const CLIENT_SDK_ID = 'your sdk id'
const PEM = fs.readFileSync(__dirname + "/keys/your-application-pem-file.pem");
let yotiClient = new YotiClient(CLIENT_SDK_ID, PEM)

```

Where:
* `APPLICATION_ID` is the identifier generated by Yoti Dashboard when you create your app.

* `CLIENT_SDK_ID` is the SDK identifier generated by Yoti Dashboard in the Key tab when you create your app. Note this is not your Application Identifier which is needed by your client-side code.

* `path/to/your-application-pem-file.pem` is the path to the application pem file. It can be downloaded only once from the Keys tab in your Yoti Dashboard.

Please do not open the pem file as this might corrupt the key and you will need to create a new application.

[Example reference](https://github.com/getyoti/yoti-node-sdk/blob/master/example/simple-login/index.js)

## Profile Retrieval

When your application receives a token via the exposed endpoint (it will be assigned to a query string parameter named `token`), you can easily retrieve the user profile by adding the following to your endpoint handler:

```javascript

yotiClient.getActivityDetails(token).then((activityDetails) => {
    //handle response here
})

```

Before you inspect the user profile, you might want to check whether the user validation was successful.
This is done as follows:

```javascript

yotiClient.getActivityDetails(token).then((activityDetails) => {
    if(activityDetails.getOutcome() == 'SUCCESS') {
        profile = activityDetails.getUserProfile();
    } else {
        // handle unhappy path
    }
})

```

[Example reference](https://github.com/getyoti/yoti-node-sdk/blob/master/example/simple-login/index.js)

## Handling Users

When you retrieve the user profile, you receive a user ID generated by Yoti exclusively for your application.
This means that if the same individual logs into another app, Yoti will assign her/him a different ID.
You can use this ID to verify whether (for your application) the retrieved profile identifies a new or an existing user.
Here is an example of how this works:

```javascript

yotiClient.getActivityDetails(token).then((activityDetails) => {
    if(activityDetails.getOutcome() == 'SUCCESS') {
        user = yourUserSearchFunction(activityDetails.getUserId());
        if(user) {
            // handle login
        } else {
            // handle registration
        }
    } else {
        // handle unhappy path
    }
})

```

Where `yourUserSearchFunction` is a piece of logic in your app that is supposed to find a user, given a userId.
No matter if the user is a new or an existing one, Yoti will always provide her/his profile, so you don't necessarily need to store it.

The `profile` object provides a set of attributes corresponding to user attributes. Whether the attributes are present or not depends on the settings you have applied to your app on Yoti Dashboard.

Update your Callback URL in our Yoti Dashboard and you should be good to go!

## AML Integration

Yoti provides an AML (Anti Money Laundering) check service to allow a deeper KYC process to prevent fraud. This is a chargeable service, so please contact [sdksupport@yoti.com](mailto:sdksupport@yoti.com) for more information.

Yoti will provide a boolean result on the following checks:
* PEP list - Verify against Politically Exposed Persons list
* Fraud list - Verify against  US Social Security Administration Fraud (SSN Fraud) list
* Watch list - Verify against watch lists from the Office of Foreign Assets Control

To use this functionality you must ensure:
* Your application is assigned to your Organisation in the Yoti Dashboard - please see [here](https://www.yoti.com/developers/documentation) for further information.
* Within your application please ensure that you have selected the 'Given Name(s)' and 'Family Name' attributes from the Data tab. This is the minimum requirement for the AML check.

The AML check uses a simplified view of the User Profile.  You need only provide the following:
* Given Name(s)
* Family Name
* Country of residence - you will need to collect this from the user yourself

To check a US citizen, you must provide two more attributes in addition to the three above:
* Social Security Number - you will need to collect this from the user yourself
* Postcode/Zip code

### Consent
Performing an Aml check on a person *requires* their consent.
**You must ensure you have user consent *before* using this service.**

### Code Example

Given a YotiClient initialised with your SDK ID and KeyPair (see [Configuration](#configuration)) performing an AML check is a straightforward case of providing basic profile data.

```javascript

// Initiate user profile data.
let country = new YotiEntity.Country('GBR');
let amlAddress = new YotiEntity.AmlAddress(country, 'E1 6DB');
let amlProfile = new YotiEntity.AmlProfile('Edward Richard George', 'Heath', amlAddress);

// Perform the check
yotiClient.performAmlCheck(amlProfile).then((amlResult) => {
  // handle success
  console.log('On PEP list ' + amlResult.isOnPepList());
  console.log("\nOn FRAUD list " + amlResult.isOnFraudList());
  console.log("\nOn WATCH list " + amlResult.isOnWatchList());
  console.log("\n");
  
  // Or
  console.log(amlResult);
}).catch((err) => {
  // handle unhappy path
  console.error(err);
})

```

## Running the Example

The example can be found in the [example folder](example).
For it to work you will need a working callback URL that your browser can redirect to. The callback URL will be: `https://localhost:9443/profile`.

* rename the [.env.example](example/.env.example) file to `.env` and fill in the required configuration values
* install the dependencies with `npm install`
* start the server `node index.js`

Visiting the `https://localhost:9443` should show a Yoti Connect button

## API Coverage

In order to get the users information, the Node SDK will decrypt the token in the callback URL. Use the following code to do this:

```javascript

yotiClient.getActivityDetails(token).then((activityDetails) => {
    let profile = activityDetails.getUserProfile();
    // Use the table below to retrieve specific attributes from the profile object
}

```
* Activity Details
  * [X] User ID `.getUserId()`
  * [X] Profile `.getUserProfile()`
    * [X] Photo `selfie`
    * [X] Full Name `fullName`
    * [X] Given Names `givenNames`
    * [X] Family Name `familyName`
    * [X] Mobile Number `phoneNumber`
    * [X] Email address `emailAddress`
    * [X] Age / Date of Birth `dateOfBirth`
    * [X] Age / Verify Condition `age[Over|Under]:[1-999]`
    * [X] Address `postalAddress`
    * [X] Gender `gender`
    * [X] Nationality `nationality`

## Working on the SDK

To install the required packages run:

```shell

npm install

```

To run the tests run:

```shell

npm test

```

## Support

For any questions or support please email [sdksupport@yoti.com](mailto:sdksupport@yoti.com).
Please provide the following to get you up and working as quickly as possible:

* Computer type
* OS version
* Version of Node being used
* Screenshot

Once we have answered your question we may contact you again to discuss Yoti products and services. If you’d prefer us not to do this, please let us know when you e-mail.
