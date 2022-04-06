# DBS checks Example

1. Have node installed in your machine - preferably, v14.18.2
2. git clone https://github.com/getyoti/yoti-node-sdk.git
3. `npm install` in the root directory.
4. `cd examples/dbs-checks`
5. `npm install` in the dbs-checks directory.
6. Rename `.env.example` file to `.env` which contains all the required SDK IDs.
7. Start the server `npm run start`

Visiting the `https://localhost:9443` should show a Yoti button that requests a DBS Basic check.
