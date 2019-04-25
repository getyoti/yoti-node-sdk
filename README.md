# Yoti NodeJS SDK

[![Build Status](https://travis-ci.com/getyoti/yoti-node-sdk.svg?branch=master)](https://travis-ci.com/getyoti/yoti-node-sdk)

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

7) [Programmatic QR Code Creation](#programmatic-qr-code-creation) -
How to retrieve a QR Code link by defining the requested user profile attributes programmatically

8) [Handling Users](#handling-users) -
How to manage users

9) [AML Integration](#aml-integration) -
How to integrate with Yoti's AML (Anti Money Laundering) service

10) [Running the Examples](#running-the-examples)

11) [API Coverage](#api-coverage) -
Attributes defined

12) [Support](#support) -
Please feel free to reach out

## An Architectural View

To integrate your application with Yoti, your back-end must expose a GET endpoint that Yoti will use to forward tokens.
The endpoint can be configured in Yoti Dashboard when you create/update your application.

The image below shows how your application back-end and Yoti integrate in the context of a Login flow.
Yoti SDK carries out for you steps 6, 7 ,8 and the profile decryption in step 9.

![alt text](login_flow.png "Login flow")

Yoti also allows you to enable user details verification from your mobile app by means of the Android (TBA) and iOS (TBA) SDKs. In that scenario, your Yoti-enabled mobile app is playing both the role of the browser and the Yoti app. By the way, your back-end doesn't need to handle these cases in a significantly different way. You might just decide to handle the `User-Agent` header in order to provide different responses for web and mobile clients.

## References

* [AES-256 symmetric encryption](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
* [RSA pkcs asymmetric encryption](https://en.wikipedia.org/wiki/RSA_(cryptosystem))
* [Protocol buffers](https://en.wikipedia.org/wiki/Protocol_Buffers)
* [Base64 data](https://en.wikipedia.org/wiki/Base64)

## Requirements

### Node version
Please refer to [Travis](https://travis-ci.com/getyoti/yoti-node-sdk) to see all compatible Node versions.

### Windows users

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

const yoti = require('yoti');
const fs = require('fs');
const CLIENT_SDK_ID = 'your sdk id';
const PEM = fs.readFileSync(__dirname + '/keys/your-application-pem-file.pem');
let yotiClient = new yoti.Client(CLIENT_SDK_ID, PEM);

```

Where:

* `APPLICATION_ID` is the identifier generated by Yoti Dashboard when you create your app.

* `CLIENT_SDK_ID` is the SDK identifier generated by Yoti Dashboard in the Key tab when you create your app. Note this is not your Application Identifier which is needed by your client-side code.

* `path/to/your-application-pem-file.pem` is the path to the application pem file. It can be downloaded only once from the Keys tab in your Yoti Dashboard.

Please do not open the pem file as this might corrupt the key and you will need to create a new application.

[Example reference](examples/profile/index.js)

### Upgrading from SDK version 2.x.x

The way the Yoti SDK client is initialised was changed in version 3. Please make sure you update your code if you're upgrading the npm package.

```javascript

// SDK version < 3
const Yoti = require('yoti')
const yotiClient = new Yoti(CLIENT_SDK_ID, PEM)

// SDK version >= 3
const yoti = require('yoti')
const yotiClient = new yoti.Client(CLIENT_SDK_ID, PEM)

```

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
        const profile = activityDetails.getProfile();
    } else {
        // handle unhappy path
    }
})

```

[Example reference](examples/profile/index.js)


## Programmatic QR code creation

Dynamic Policy generation is a way of requesting non-static attribute lists for your application.

This is useful when you want or need different permutations of attributes from Yoti, without having to create a new application.

E.g:

* Request 1: full-name and date-of-birth
* Request 2: full-name and address

This service will query Yoti for a QR Code/link associated with the requested attribute list.

This QR Code/link should then be embedded into your page using the Yoti widget to begin a share with Yoti.

### Example

The following example demonstrates how a Dynamic Policy can be built using attribute methods such as `withFullName()`, and generic methods `withWantedAttribute()` and `withWantedAttributeByName()`.

```javascript

const wantedEmailAttribute = new WantedAttributeBuilder()
  .withName('email_address')
  .build();

const dynamicPolicy = new Yoti.DynamicPolicyBuilder()
  .withFullName()
  .withWantedAttributeByName('given_names')
  .withWantedAttribute(wantedEmailAttribute)
  .build();

const dynamicScenario = new Yoti.DynamicScenarioBuilder()
  .withCallbackEndpoint('/profile')
  .withPolicy(dynamicPolicy)
  .build();

yotiClient.createShareUrl(dynamicScenario)
  .then((shareUrlResult) => {
    const shareUrl = shareUrlResult.getShareUrl();
    const refId = shareUrlResult.getRefId();
  });

```

## Handling Users

When you retrieve the user profile, you receive a user ID generated by Yoti exclusively for your application.
This means that if the same individual logs into another app, Yoti will assign her/him a different ID.
You can use this ID to verify whether (for your application) the retrieved profile identifies a new or an existing user.
Here is an example of how this works:

```javascript

yotiClient.getActivityDetails(token).then((activityDetails) => {
    if(activityDetails.getOutcome() == 'SUCCESS') {
        const userProfile = activityDetails.getUserProfile(); // deprecated
        const profile = activityDetails.getProfile();
        const user = yourUserSearchFunction(activityDetails.getRememberMeId());
        if(user) {
            // handle login
        } else {
            // handle registration
            const givenNames = profile.getGivenNames().getValue();
            const familyName = profile.getFamilyName().getValue();
        }
    } else {
        // handle unhappy path
    }
})

```

Where `yourUserSearchFunction` is a piece of logic in your app that is supposed to find a user, given a _Remember Me ID_.
No matter if the user is a new or an existing one, Yoti will always provide her/his profile, so you don't necessarily need to store it.

The `profile` object provides a set of attributes corresponding to user attributes. Whether the attributes are present or not depends on the settings you have applied to your app on Yoti Dashboard.

You can retrieve the sources and verifiers for each attribute as follows:

```javascript
const givenNamesSources = givenNames.getSources(); // list/array of anchors
const givenNamesVerifiers = givenNames.getVerifiers(); // list/array of anchors
```

You can also retrieve further properties from these respective anchors in the following way:

```javascript
// Retrieving properties of the first anchor
const value = givenNamesSources[0].getValue(); // string
const subtype = givenNamesSources[0].getSubType(); // string
const timestamp = givenNamesSources[0].getSignedTimeStamp().getTimestamp(); // Date object
const originServerCerts = givenNamesSources[0].getOriginServerCerts(); // list of X509 certificates
```

## AML Integration

Yoti provides an AML (Anti Money Laundering) check service to allow a deeper KYC process to prevent fraud. This is a chargeable service, so please contact [sdksupport@yoti.com](mailto:sdksupport@yoti.com) for more information.

Yoti will provide a boolean result on the following checks:

* PEP list - Verify against Politically Exposed Persons list
* Fraud list - Verify against  US Social Security Administration Fraud (SSN Fraud) list
* Watch list - Verify against watch lists from the Office of Foreign Assets Control

To use this functionality you must ensure your application is assigned to your organisation in the Yoti Dashboard - please see [here](https://www.yoti.com/developers/documentation/#1-creating-an-organisation) for further information.

For the AML check you will need to provide the following:

* Data provided by Yoti (please ensure you have selected the Given name(s) and Family name attributes from the Data tab in the Yoti Dashboard)
  * Given name(s)
  * Family name
* Data that must be collected from the user:
  * Country of residence (must be an ISO 3166 3-letter code)
  * Social Security Number (US citizens only)
  * Postcode/Zip code (US citizens only)

### Consent

Performing an AML check on a person *requires* their consent.
**You must ensure you have user consent *before* using this service.**

### Code example

Given a YotiClient initialised with your SDK ID and KeyPair (see [Configuration](#configuration)) performing an AML check is a straightforward case of providing basic profile data.

```javascript

// Initiate user profile data.

const amlAddress = new Yoti.AmlAddress('GBR');
const amlProfile = new Yoti.AmlProfile('Edward Richard George', 'Heath', amlAddress);

yotiClient.performAmlCheck(amlProfile).then((amlResult) => {
  console.log(amlResult.isOnPepList);
  console.log(amlResult.isOnFraudList);
  console.log(amlResult.isOnWatchList);

  // Or
  console.log(amlResult);
}).catch((err) => {
  console.error(err);
})

```

## Running the Examples

### Fetching the profile

The example can be found [here](examples/profile).
1. From the [Yoti Dashboard](https://www.yoti.com/dashboard/applications) set the application domain of your app to `localhost:9443`
1. Set the scenario callback URL to `/profile`
1. Rename the [.env.example](examples/profile/.env.example) file to `.env` and fill in the required configuration values
1. Install the dependencies with `npm install`
1. Start the server `node index.js`

Visiting the `https://localhost:9443` should show a Yoti Connect button

### Performing an AML check

The example can be found [here](examples/aml-check).

* rename the [.env.example](examples/aml-check/.env.example) file to `.env` and fill in the required configuration values
* install the dependencies with `npm install`
* run the script with `node aml.js` or  `node aml-usa.js`

## API Coverage

In order to get the users information, the Node SDK will decrypt the token in the callback URL. Use the following code to do this:

```javascript

yotiClient.getActivityDetails(token).then((activityDetails) => {
    const userProfile = activityDetails.getProfile();
    // Use the table below to retrieve specific attributes from the profile object
})
```

* Activity Details
  * [X] Remember Me ID `.getRememberMeId()`
  * [X] Parent Remember Me ID `.getParentRememberMeId()`
  * [X] Receipt ID `.getReceiptId()`
  * [X] Base64 Selfie Uri `getBase64SelfieUri()`
  * [X] Profile `.getProfile()`
    * [X] Full Name `getFullName().getValue()`
    * [X] Given Names `getGivenNames().getValue()`
    * [X] Family Name `getFamilyName().getValue()`
    * [X] Age / Date of Birth `getDateOfBirth().getValue()`
    * [X] Age / Verify Condition `getAgeVerified().getValue()`
    * [X] Gender `getGender().getValue()`
    * [X] Nationality `getNationality().getValue()`
    * [X] Mobile Number `getPhoneNumber().getValue()`
    * [X] Photo `getSelfie().getValue()`
    * [X] Email Address `getEmailAddress().getValue()`
    * [X] Address `getPostalAddress().getValue()`
    * [X] Structured Address `getStructuredPostalAddress().getValue()`
    * [X] Document Details `getDocumentDetails().getValue()`

## Support

For any questions or support please email [sdksupport@yoti.com](mailto:sdksupport@yoti.com).
Please provide the following to get you up and working as quickly as possible:

* Computer type
* OS version
* Version of Node being used
* Screenshot

Once we have answered your question we may contact you again to discuss Yoti products and services. If you’d prefer us not to do this, please let us know when you e-mail.
