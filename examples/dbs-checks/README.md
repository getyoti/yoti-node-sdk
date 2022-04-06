# DBS checks Example

1. Have node installed in your machine - preferably, v14.18.2
2. `git clone https://github.com/getyoti/yoti-node-sdk.git`
3. `git checkout SDK-2084-dbs-work-for-testing-only`
4. `npm install` in the root directory.
5. `cd examples/dbs-checks`
6. `npm install` in the dbs-checks directory.
7. Rename `.env.example` file in the dbs-checks folder to `.env` which contains all the required SDK IDs.
8. Start the server `npm run start`

Visiting the `https://localhost:9443` should show a Yoti button that requests a DBS Basic check.
