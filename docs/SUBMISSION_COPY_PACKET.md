# SCF Submission Copy Packet

This file is a compact copy-paste packet for the SCF application form.

## Project Name

Stellar BountyPay Scout

## Repository URL

https://github.com/sevencat2004/stellar-bountypay-scout

## Local Demo URL

http://localhost:8791

## Short Summary

Stellar BountyPay Scout is a payment-gated bounty intelligence tool that uses Stellar testnet payment intents and Horizon memo verification to unlock deep GitHub bounty risk analysis for open-source builders.

## Longer Summary

Open-source bounty hunters often waste time on issues that look valuable but are already assigned, crowded with duplicate pull requests, stale, unclear about payout, or tied to non-cash rewards. Stellar BountyPay Scout helps developers make a practical go/no-go decision before implementation begins.

The MVP creates a Stellar testnet payment intent, verifies XLM payments through Horizon by transaction memo, and unlocks deep GitHub bounty analysis after verified payment or local demo proof. The analysis checks issue state, assignment, comment crowding, bounty amount signals, repository health, visible competition, and related open pull requests. It returns a clear `START`, `INSPECT`, or `SKIP` recommendation.

## Why Stellar

Stellar is a strong fit because this workflow needs low-cost, fast, verifiable payments. The app creates a Stellar payment intent with destination, amount, asset, network, and memo. A user sends payment externally, and the app verifies the transaction through Horizon without custodying funds or requesting private keys.

This is a concrete Stellar payment workflow for developer tooling: paid bounty intelligence, milestone review, and future payout tracking for open-source builders.

## Current MVP Status

The MVP is live in a public GitHub repository and includes:

- Stellar testnet payment intent generation.
- Horizon memo payment verification.
- Payment-gated GitHub bounty analysis.
- CLI demo.
- HTTP API demo.
- Local dashboard.
- SCF submission materials.
- `npm run preflight` submission readiness checks.

## Requested Funding

25,000 XLM

## Funding Rationale

The MVP is already implemented and published. Funding will be used for production hardening, Freighter wallet guidance, USDC-on-Stellar support, hosted deployment, persisted bounty evaluations, milestone/payout tracking, and mainnet-ready launch work.

## Milestones

Milestone 1: Public MVP

Deliver public GitHub repository, CLI, HTTP demo, local dashboard, Stellar testnet payment intent generation, Horizon memo verification, and bounty risk analysis engine.

Milestone 2: Wallet and Asset Support

Add Freighter-oriented instructions, USDC-on-Stellar payment intent support, payment status polling, receipt display, and mainnet configuration guidance.

Milestone 3: Builder Workflow

Add saved bounty evaluations, comparison views, milestone and payout tracking, and exportable decision packets for bounty work.

Milestone 4: Mainnet-Ready Launch

Add deployment documentation, production configuration hardening, abuse controls, hosted demo, and mainnet-ready operation guide.

## Technical Stack

- Node.js 20+
- Native HTTP server
- GitHub REST API
- Stellar Horizon API
- Static browser dashboard
- No third-party runtime dependencies in the MVP

## Safety Model

The MVP does not ask for private keys, seed phrases, or recovery phrases. It only needs a public Stellar destination account. Payments are sent externally through a wallet or testnet tool, and verification is read-only through Horizon.

## User Information To Fill Manually

- Submitter name
- Email
- Country/region
- Public Stellar wallet address
- SCF profile/team details
- Any required KYC, tax, or award paperwork
