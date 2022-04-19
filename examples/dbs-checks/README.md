# DBS checks Example

1. Have node installed in your machine - preferably, v14.18.2
2. `git clone https://github.com/getyoti/yoti-node-sdk.git`
3. `git checkout SDK-2084-dbs-work-for-testing-only`
4. `npm install` in the root directory.
5. `cd examples/dbs-checks`
6. `npm install` in the dbs-checks directory.
7. Start the server `npm run start:staging`
8. To run the tests in preprod environment: `npm run start:preprod`
9. To run the tests in production environment: `npm run start:live`

Visiting the `https://localhost:9443` should show a Yoti button that requests a check of specified type.
