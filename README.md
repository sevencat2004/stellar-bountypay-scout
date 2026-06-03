# Stellar BountyPay Scout

Stellar BountyPay Scout is a payment-gated bounty and grant intelligence tool built for the Stellar Community Fund #44 Build Award.

It helps open-source builders decide whether a GitHub bounty is worth starting before they spend hours implementing. The demo creates a Stellar testnet payment intent, verifies payments through Horizon by transaction memo, and unlocks deep bounty analysis after a verified payment or local demo proof.

## Why This Fits Stellar

Stellar is strong at fast, low-cost payments. Open-source bounty work has the opposite problem: developers often cannot tell whether a task will actually pay before they start. This project connects those two pieces:

- A builder requests a bounty risk analysis.
- The app creates a Stellar payment intent with destination, amount, asset, memo, and Horizon links.
- A payment can be verified through Horizon without exposing private keys.
- The paid result gives a practical `START`, `INSPECT`, or `SKIP` recommendation.

The current MVP is deliberately safe: it never asks for seed phrases, private keys, or recovery phrases.

## Current MVP

- Stellar testnet payment intent generation.
- XLM payment verification through Horizon.
- Memo-based unlock flow.
- GitHub issue and repository risk analysis.
- HTTP API for demos.
- CLI for local verification.
- Static dashboard served by the local server.
- SCF submission draft in `SCF_SUBMISSION.md`.

## Requirements

- Node.js 20+
- Optional: `GITHUB_TOKEN` for higher GitHub API limits.
- Optional: a Stellar testnet receiving account for live payment verification.

## Setup

```powershell
cd D:\coin\stellar-bountypay-scout
copy .env.example .env
```

Edit `.env` and set:

```text
STELLAR_DESTINATION_ACCOUNT=<your public Stellar testnet account>
```

Do not put a private key in this project.

## Run Local Tests

```powershell
npm test
```

## Run SCF Preflight

Before submission, run:

```powershell
npm run preflight
```

The preflight checks required project files, package scripts, safety copy, Git branch state, public GitHub repository status, and the local self-test.

## Create A Payment Intent

```powershell
npm run intent -- https://github.com/gyroflow/gyroflow/issues/742
```

The response includes:

- Stellar network.
- Destination account.
- Amount and asset.
- Memo.
- Horizon account link.
- Friendbot link for testnet account funding.

## Analyze With Local Demo Proof

```powershell
npm run analyze -- https://github.com/gyroflow/gyroflow/issues/742 demo-paid
```

`demo-paid` is accepted only for local demonstration. A production version would require a verified Stellar payment.

## Run HTTP Demo

```powershell
npm run serve
```

Open:

```text
http://localhost:8791
```

Request without payment proof:

```powershell
curl.exe -i -X POST http://localhost:8791/analyze -H "Content-Type: application/json" -d "{\"issueUrl\":\"https://github.com/gyroflow/gyroflow/issues/742\"}"
```

The server returns `402 Payment Required` with a Stellar payment intent.

Request with local demo proof:

```powershell
curl.exe -X POST http://localhost:8791/analyze -H "Content-Type: application/json" -d "{\"issueUrl\":\"https://github.com/gyroflow/gyroflow/issues/742\",\"paymentProof\":\"demo-paid\"}"
```

## Verify A Real Testnet Payment

1. Send the exact amount to `STELLAR_DESTINATION_ACCOUNT`.
2. Use the memo returned by the payment intent.
3. Call `/analyze` with that memo:

```json
{
  "issueUrl": "https://github.com/gyroflow/gyroflow/issues/742",
  "memo": "bps-..."
}
```

The server checks recent Horizon payments to the destination account, follows each payment's transaction link, and verifies the memo.

## SCF #44 Submission Package

See:

```text
SCF_SUBMISSION.md
```

Supporting submission files:

```text
docs/SCF_FORM_ANSWERS.md
docs/DEMO_SCRIPT.md
docs/MILESTONES.md
```

## User-Side Actions Needed Later

- Create or confirm a public GitHub repository.
- Provide a public Stellar wallet address for SCF submission.
- Submit the SCF form from the user's account.
- Complete any SCF KYC, tax, or award paperwork.

Never share seed phrases, private keys, or recovery phrases.
