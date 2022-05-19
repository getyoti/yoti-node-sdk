# Identity profile checks Example

## Checking the identity profile of the user

1. From the [Yoti Hub](https://hub.yoti.com) set the application domain of your app to `localhost:9445`
1. Set the scenario callback URL to `/identity-profile-report`
1. Rename the [.env.example](.env.example) file to `.env` and fill in the required configuration values
1. Install the dependencies with `npm install`
1. Start the server `node index.js`

Visiting the `https://localhost:9445` should show the following schemes: DBS-BASIC, RTW, RTR and a Yoti Connect button. 
