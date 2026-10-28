# AffixIO Age Proof Example

This example takes the result of a Yoti Age Verification session and turns it into a yes/no "over 18" proof using [AffixIO](https://www.affix-io.com). The exact age, images and other personal details are not kept or sent on. Only the yes/no answer, a proof ID and a reference to the Yoti session are kept.

This can be useful when another party, such as a shop or an AI agent acting for the user, needs to know that an age check passed but does not need the details behind it.

It uses the Yoti Age Verification **sandbox**, so no real users or documents are involved.

## Flow

1. Get a Yoti access token (PS384 signed JWT, as described in the [sandbox integration guide](https://developers.yoti.com/age-verification/sandbox-integration-guide))
1. Create an Age Verification sandbox session with an 18+ threshold
1. Mock the user's response in the sandbox ([mock the response](https://developers.yoti.com/age-verification/mock-the-sandbox-response))
1. Fetch the session result ([sandbox results](https://developers.yoti.com/age-verification/sandbox-results)) and reduce it to yes/no
1. If the answer is yes, ask AffixIO to issue a proof with its built-in `yesno` circuit
1. Verify the proof by its ID, as the relying party would. The response includes `decision` (`yes` or `no`) and an ML-DSA-65 signed attestation. Proofs are single use, so verifying the same proof twice returns `409 double_spend_detected`

## Requirements

* Node.js 22 or later (uses the built-in `fetch`)
* A Yoti Age Verification sandbox service, with its SDK ID and PEM file, from [Yoti Hub](https://hub.yoti.com)
* An AffixIO API key from [AffixIO Studio](https://www.affix-io.com/studio). New accounts get 100 free proofs with no card needed (AI agent accounts get 150)

## Running the example

1. Rename the [.env.example](.env.example) file to `.env` and fill in the required configuration values
1. Install the dependencies with `npm install`
1. Run the example with `npm start`
1. To see the "no" path, run `npm start -- 16`. No AffixIO proof is issued

* _[index.js](./index.js) contains the whole flow, with comments for each step_

## Notes

* Keep your Yoti PEM file and AffixIO API key on the server. Do not put them in browser code.
* In production, use the live Age Verification API and the Yoti user view instead of the sandbox mock. See the [Yoti Age Verification docs](https://developers.yoti.com/age-verification/overview).
* AffixIO calls use `POST https://api.affix-io.com/v1/circuits/yesno/prove` and `/verify` with an `X-API-Key` header. See the [AffixIO quickstart](https://www.affix-io.com/docs/quickstart/)
