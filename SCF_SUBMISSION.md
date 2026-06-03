# SCF #44 Submission Draft

## Project Title

Stellar BountyPay Scout

## One-Line Summary

A Stellar payment-gated bounty intelligence tool that helps open-source builders avoid low-probability bounty work and unlock deep GitHub issue analysis after a verified Stellar payment.

## Project Description

Open-source bounty hunters often lose time on issues that look valuable but are already assigned, crowded with duplicate pull requests, stale, missing a clear payout path, or tied to token-only rewards. Stellar BountyPay Scout gives builders a practical decision before they start work.

The MVP creates a Stellar testnet payment intent, verifies XLM payments through Horizon by transaction memo, and unlocks a deep GitHub bounty analysis. The analysis checks issue state, assignment, comment crowding, bounty amount signals, repository health, visible competition, and related open pull requests. It returns a clear `START`, `INSPECT`, or `SKIP` recommendation.

This connects a concrete Stellar payment workflow with a real developer-economy use case: paid, low-friction intelligence for open-source bounty work.

## Track Fit

Suggested track: Integration Track or Open Track.

The current version integrates directly with Stellar testnet and Horizon. Future milestones expand it into a production-ready Stellar payment workflow for bounty screening, milestone review, and payout tracking.

## Current MVP Features

- Stellar testnet payment intent generation.
- XLM payment verification through Horizon.
- Memo-based payment unlock flow.
- GitHub bounty risk analysis.
- CLI demo.
- HTTP API demo.
- Static local dashboard.
- No private keys required.

## Stellar Usage

The project uses Stellar as the payment and verification layer:

- Payment destination is a public Stellar account.
- Payment amount and asset are included in the intent.
- Each analysis request receives a unique memo.
- The app verifies recent Horizon payments to the destination account.
- It follows the payment transaction link and checks the memo before unlocking paid analysis.

## Safety

The MVP does not custody funds and does not request private keys.

Users only configure a public destination account. Payments are sent externally through a wallet or testnet tool. Verification is read-only through Horizon.

## Repository URL

https://github.com/sevencat2004/stellar-bountypay-scout

## Demo URL

For local demo:

```text
http://localhost:8791
```

For public submission, use the GitHub README demo section and optionally a short video.

## Milestones

### Milestone 1: Public MVP and Stellar Payment Verification

- Publish the repository.
- Ship CLI and HTTP demo.
- Generate Stellar payment intents.
- Verify testnet XLM payments through Horizon by memo.
- Produce bounty risk analysis for GitHub issues.

### Milestone 2: Production Wallet and Asset Support

- Add Freighter-compatible wallet instructions.
- Add USDC-on-Stellar payment intent support.
- Improve payment status polling and receipt display.
- Add better audit logs for paid analyses.

### Milestone 3: Bounty Workflow Dashboard

- Add saved bounty evaluations.
- Add milestone and payout tracking.
- Add user-facing comparison views for bounty opportunities.
- Add exportable review packets for developers.

### Milestone 4: Mainnet Launch

- Switch from testnet-only demo to mainnet-ready configuration.
- Add deployment documentation.
- Add production monitoring and abuse controls.
- Publish a live hosted demo.

## Funding Request

Recommended initial request: 20,000 to 35,000 XLM for MVP hardening, wallet integration, USDC support, and hosted launch.

The request can be adjusted before submission based on SCF form expectations and the user's preferred scope.

## User Information Needed

- Submitter name.
- Email.
- Country/region.
- Public Stellar wallet address.
- GitHub repository URL after publication.
- Any SCF profile or team details requested by the form.

Do not share private keys, seed phrases, or recovery phrases.
